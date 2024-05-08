// #region Imports
import { lstatSync, stat, createReadStream, Stats } from 'node:fs';
import { createServer, IncomingMessage, Server, ServerResponse } from 'node:http';
import { extname, join } from 'node:path';
import { createGzip } from 'node:zlib';

import mime from './mime.json' assert {type: 'json'};
import gzipWhitelist from './gzWhitelist.json' assert {type: 'json'};
import time from './timestamp';
import log from './log';
import frontSplit from './frontSplit';
import { Transform } from 'node:stream';
// #endregion Imports

// #region Variables
const mimeTypes: Map<string, string> = new Map(mime as [string, string][]);
const minGzSize: number = 1400; // 150 bytes is strictly bad, > 1000 is usually good
const defaultPort: number = 80;

let staticPath: string = './';
let headers: Map<string, string> = new Map();
let doGzip: boolean = true;
let doSecurityHeaders: boolean = true;
let corsURL: string = '';
let server: Server;
// #endregion Variables


// #region Handler
/**
 * Handles incoming HTTP requests and sends appropriate responses based on the request method and requested resource.
 *
 * @param {IncomingMessage} request - The incoming request object.
 * @param {ServerResponse} response - The server response object.
 * @return {void} This function does not return anything.
 */
function handler(request: IncomingMessage, response: ServerResponse): void {
	const start: number = Date.now();

	// remove anything to the right of, and including: ?#
	let requestPath: string = frontSplit(frontSplit(request.url, '?'), '#');

	// no one uses "default.html" anymore, right?
	if (requestPath.slice(-1) === '/') requestPath += 'index.html';

	// set default security headers
	if (doSecurityHeaders) {
		response.setHeader('X-Content-Type-Options', 'nosniff');
		response.setHeader('X-XSS-Protection', 0);
		response.setHeader('Access-Control-Allow-Methods', ['GET', 'HEAD']);
		response.setHeader('Access-Control-Allow-Headers', ['X-Requested-With', 'Content-Type', 'Content-Encoding']);
		response.setHeader('Access-Control-Allow-Credentials', 'false');
		response.setHeader('Cross-Origin-Resource-Policy', 'same-site');
		response.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
		response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
		response.setHeader('Server', 'webserver');
		response.setHeader('Permissions-Policy', [
			'geolocation=()',
			'camera=()',
			'microphone=()',
			'display-capture=()',
		]);

		// https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
		response.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline'; frame-ancestors 'self'; form-action 'self';");
	}

	// set custom headers
	headers.forEach((value: string, key: string) => {
		response.setHeader(key, value);
	});

	// set CORS URL
	if (corsURL) {
		response.setHeader('Access-Control-Allow-Origin', corsURL);
	}

	// early-ish exit if method is not GET or HEAD
	if (request.method !== 'HEAD' && request.method !== 'GET') {
		response.setHeader('Allow', ['HEAD', 'GET']); // must send "Allow" header with a 405 response
		response.statusCode = 405;
		response.end('405');

		log(request, response, requestPath, new Date(), Date.now() - start);

		return;
	}

	const localPath: string = join(staticPath, requestPath);

	// handle head/get requests
	stat(localPath, (err: any, fileStats: Stats): void => {
		if (err) {
			if (err.code === 'ENOENT') {
				response.statusCode = 404;
				response.end('404');
			}
			else {
				console.error(`${time(new Date())} Error: ${err.message}`);
				response.statusCode = 500;
				response.end('500');
			}

			log(request, response, requestPath, new Date(), Date.now() - start);

			return;
		}

		const lastModified = (new Date(fileStats.mtime)).toUTCString();
		response.setHeader('Last-Modified', lastModified);

		let size = fileStats?.size || 0;

		//////  HEAD  //////

		if (request.method === 'HEAD') {
			response.setHeader('Content-Length', size);
			response.statusCode = 204;
			response.end();
			log(request, response, requestPath, new Date(), Date.now() - start, size);

			return;
		}

		//////  GET  //////

		// removes the leading "." for easier processing and sets to lowercase
		const fileExtension = extname(localPath).toLowerCase().substring(1) || '';

		// setting MIME type
		// https://www.rfc-editor.org/rfc/rfc7231#section-3.1.1.5
		// Don't generate a Content-Type header if the media is unknown to the sender
		if (mimeTypes.has(fileExtension)) response.setHeader('Content-Type', mimeTypes.get(fileExtension));

		// Stream data
		const fileReadStream = createReadStream(localPath);

		response.on('close', () => {
			log(request, response, requestPath, new Date(), Date.now() - start, size);
		});

		// I don't actually know if this works
		response.on('error', (err) => {
			console.error(`${time(new Date())} Error: ${err.message}`);
			response.statusCode = 500;
			response.end('500');
		});

		if ( // if accepts gzip, is big enough to be gzipped, and isn't already compressed
			doGzip &&
			request.headers['accept-encoding']?.includes('gzip') &&
			size >= minGzSize &&
			gzipWhitelist.includes(fileExtension)
		) {
			response.setHeader('Content-Encoding', 'gzip');
			response.statusCode = 200;
			const gz = createGzip();

			size = 0;
			const byteCounter = new Transform({
				transform(chunk: Buffer, encoding: string, callback: Function) {
					size += chunk.length;
					callback(null, chunk);
				}
			})

			fileReadStream.pipe(gz).pipe(byteCounter).pipe(response);
		}
		else {
			response.statusCode = 200;
			fileReadStream.pipe(response);
		}

	});
}
// #endregion Handler

// #region Exports
export interface ezServer {
	listen(port?: number): ezServer;
	close(fn: () => void): void;
	path(newPath: string): ezServer | void;
	headers(arr: [string, any][]): ezServer;
	gzip(): ezServer;
	security(): ezServer;
	cors(url?: string): ezServer;
}

export default function (): ezServer {
	return {
		listen(port?: number): ezServer {
			server = createServer(handler);

			server.on('error', (err: any) => {
				if (err.code === 'EADDRINUSE') {
					throw Error(`Port ${port} in use`);
				}
				else {
					throw err;
				}
			});

			server.listen(port || defaultPort, () => {
				console.log(`${time(new Date())} Server running on port ${port} - hosting from "${staticPath}"`);
			});

			return this;
		},
		close(fn: () => void): void {
			if (server && server.close) {
				fn ? server.close(fn) : server.close();
			}
		},
		path(newPath: string): ezServer | void {
			try {
				const pathStats: Stats = lstatSync(newPath);

				if (pathStats.isDirectory()) {
					console.log('setting path to ' + newPath);
					staticPath = newPath;
				}
				else {
					throw Error(`${newPath} is not a directory`);
				}

				return this;
			}
			catch (err: any) {
				if (err.code === 'ENOENT') {
					throw Error(`${newPath} does not exist`);
				}
				else {
					throw err;
				}
			}
		},
		headers(arr: [string, any][]): ezServer {
			headers = new Map(arr);
			return this;
		},
		gzip(): ezServer {
			doGzip = false;
			return this;
		},
		security(): ezServer {
			doSecurityHeaders = false;
			return this;
		},
		cors(url?: string): ezServer {
			corsURL = url ? url : '*';
			return this;
		},
	};
}
// #endregion Exports