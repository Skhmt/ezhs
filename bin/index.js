#!/usr/bin/env nodeimport { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "node:fs"
const external_node_fs_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");
;// CONCATENATED MODULE: external "node:http"
const external_node_http_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:http");
;// CONCATENATED MODULE: external "node:path"
const external_node_path_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");
;// CONCATENATED MODULE: external "node:zlib"
const external_node_zlib_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:zlib");
;// CONCATENATED MODULE: ./src/mime.json
const mime_namespaceObject = JSON.parse('[["css","text/css"],["html","text/html; charset=UTF-8"],["htm","text/html; charset=UTF-8"],["js","text/javascript"],["mjs","text/javascript"],["xhtml","application/xhtml+xml"],["csv","text/csv"],["json","application/json"],["xml","text/xml"],["txt","text/plain"],["rtf","application/rtf"],["bmp","image/bmp"],["gif","image/gif"],["jpg","image/jpeg"],["jpeg","image/jpeg"],["png","image/png"],["svg","image/svg+xml"],["tif","image/tiff"],["tiff","image/tiff"],["webp","image/webp"],["3gp","video/3gpp"],["3g2","video/3gpp2"],["avi","video/x-msvideo"],["mov","video/quicktime"],["mp4","video/mp4"],["mpeg","video/mpeg"],["ogv","video/ogg"],["ts","video/mp2t"],["webm","video/webm"],["wmv","video/x-ms-wmv"],["aac","audio/aac"],["mid","audio/midi"],["midi","audio/midi"],["mp3","audio/mpeg"],["oga","audio/ogg"],["wav","audio/wav"],["weba","audio/webm"],["eot","application/vnd.ms-fontobject"],["otf","font/otf"],["ttf","font/ttf"],["woff","font/woff"],["woff2","font/woff2"],["7z","application/x-7z-compressed"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["gz","application/gzip"],["rar","application/vnd.rar"],["tar","application/x-tar"],["zip","application/zip"],["jar","application/java-archive"],["pdf","application/pdf"],["ics","text/calendar"],["epub","application/epub+zip"],["azw","application/vnd.amazon.ebook"],["ico","application/vnd.microsoft.icon"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["vsd","application/vnd.visio"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["csh","application/x-csh"],["sh","application/x-sh"],["exe","application/vnd.microsoft.portable-executable"],["msi","application/x-msdownload"]]');
;// CONCATENATED MODULE: ./src/gzWhitelist.json
const gzWhitelist_namespaceObject = JSON.parse('["html","htm","xhtml","css","js","mjs","cjs","map","json","xml","kml","svg","otf","ttf","txt","csv","md","log"]');
;// CONCATENATED MODULE: ./src/timestamp.ts
/**
 * Creates a CLF formatted timestamp
 * [10/Oct/2000:13:55:36 -0700]
 *
 * @returns {string} the timestamp
 */
function time(now) {
    const day = now.getDate().toString().padStart(2, '0');
    const mon = now.toLocaleString('default', { month: 'short' });
    const year = now.getFullYear();
    const hrs = now.getHours().toString().padStart(2, '0');
    const min = now.getMinutes().toString().padStart(2, '0');
    const sec = now.getSeconds().toString().padStart(2, '0');
    // const ms = now.getMilliseconds().toString().padStart(3, '0')
    const timeOffset = now.getTimezoneOffset() / 60;
    let timezone = timeOffset > 1 ? '-' : '+'; // this is correct, even though it seems backwards
    timezone += timeOffset.toString().padStart(2, '0').padEnd(4, '0');
    return `[${day}/${mon}/${year}:${hrs}:${min}:${sec} ${timezone}]`;
}

;// CONCATENATED MODULE: ./src/log.ts

/**
 * Logs in common log format: 127.0.0.1 - - [26/Jan/2021:18:36:59 -0800] "GET /index.html HTTP/1.1" 200 70
 * @param {*} request
 * @param {*} response
 * @param {string} requestPath
 * @param {number} startTime
 */
function log(request, response, requestPath, now, runTime, length) {
    var _a;
    const outputBuilder = [
        ((_a = request.socket) === null || _a === void 0 ? void 0 : _a.remoteAddress) || '-',
        '-', // clientid - usually blank
        '-', // userid - usually blank
        time(now),
        `"${request.method} ${requestPath} HTTP/${request.httpVersion}"`,
        response.statusCode.toString(),
        length ? Number(length).toLocaleString() : '-',
        runTime + 'ms'
    ];
    console.log(outputBuilder.join(' '));
}

;// CONCATENATED MODULE: ./src/frontSplit.ts
/**
 * A function that splits a string based on a given character and returns the front part of the string.
 *
 * @param {string | undefined} fullString - The string to be split.
 * @param {string} characterToSplit - The character used to split the string.
 * @return {string} The front part of the string before the character, or the whole string if the character is not found.
 */
function frontSplit(fullString, characterToSplit) {
    if (typeof fullString == 'undefined')
        return '';
    const index = fullString.indexOf(characterToSplit);
    return (index > -1) ? fullString.substring(0, index) : fullString;
}

;// CONCATENATED MODULE: external "node:stream"
const external_node_stream_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:stream");
;// CONCATENATED MODULE: ./src/index.ts
// #region Imports










// #endregion Imports
// #region Variables
const src_mimeTypes = new Map(mime_namespaceObject);
const minGzSize = 1400; // 150 bytes is strictly bad, > 1000 is usually good
const defaultPort = 80;
let staticPath = './';
let headers = new Map();
let doGzip = true;
let doSecurityHeaders = true;
let corsURL = '';
let server;
// #endregion Variables
// #region Handler
/**
 * Handles incoming HTTP requests and sends appropriate responses based on the request method and requested resource.
 *
 * @param {IncomingMessage} request - The incoming request object.
 * @param {ServerResponse} response - The server response object.
 * @return {void} This function does not return anything.
 */
function handler(request, response) {
    const start = Date.now();
    // remove anything to the right of, and including: ?#
    let requestPath = frontSplit(frontSplit(request.url, '?'), '#');
    // no one uses "default.html" anymore, right?
    if (requestPath.slice(-1) === '/')
        requestPath += 'index.html';
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
    headers.forEach((value, key) => {
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
    const localPath = (0,external_node_path_namespaceObject.join)(staticPath, requestPath);
    // handle head/get requests
    (0,external_node_fs_namespaceObject.stat)(localPath, (err, fileStats) => {
        var _a;
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
        let size = (fileStats === null || fileStats === void 0 ? void 0 : fileStats.size) || 0;
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
        const fileExtension = (0,external_node_path_namespaceObject.extname)(localPath).toLowerCase().substring(1) || '';
        // setting MIME type
        // https://www.rfc-editor.org/rfc/rfc7231#section-3.1.1.5
        // Don't generate a Content-Type header if the media is unknown to the sender
        if (src_mimeTypes.has(fileExtension))
            response.setHeader('Content-Type', src_mimeTypes.get(fileExtension));
        // Stream data
        const fileReadStream = (0,external_node_fs_namespaceObject.createReadStream)(localPath);
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
            ((_a = request.headers['accept-encoding']) === null || _a === void 0 ? void 0 : _a.includes('gzip')) &&
            size >= minGzSize &&
            gzWhitelist_namespaceObject.includes(fileExtension)) {
            response.setHeader('Content-Encoding', 'gzip');
            response.statusCode = 200;
            const gz = (0,external_node_zlib_namespaceObject.createGzip)();
            size = 0;
            const byteCounter = new external_node_stream_namespaceObject.Transform({
                transform(chunk, encoding, callback) {
                    size += chunk.length;
                    callback(null, chunk);
                }
            });
            fileReadStream.pipe(gz).pipe(byteCounter).pipe(response);
        }
        else {
            response.statusCode = 200;
            fileReadStream.pipe(response);
        }
    });
}
/* harmony default export */ function src() {
    return {
        listen(port) {
            server = (0,external_node_http_namespaceObject.createServer)(handler);
            server.on('error', (err) => {
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
        close(fn) {
            if (server && server.close) {
                fn ? server.close(fn) : server.close();
            }
        },
        path(newPath) {
            try {
                const pathStats = (0,external_node_fs_namespaceObject.lstatSync)(newPath);
                if (pathStats.isDirectory()) {
                    console.log('setting path to ' + newPath);
                    staticPath = newPath;
                }
                else {
                    throw Error(`${newPath} is not a directory`);
                }
                return this;
            }
            catch (err) {
                if (err.code === 'ENOENT') {
                    throw Error(`${newPath} does not exist`);
                }
                else {
                    throw err;
                }
            }
        },
        headers(arr) {
            headers = new Map(arr);
            return this;
        },
        gzip() {
            doGzip = false;
            return this;
        },
        security() {
            doSecurityHeaders = false;
            return this;
        },
        cors(url) {
            corsURL = url ? url : '*';
            return this;
        },
    };
}
// #endregion Exports

;// CONCATENATED MODULE: ./src/cli.ts

const cli_server = src();
const help = `
Easy HTTP Server

	Options:
		-d, --dir       Sets the directory to host static files, defaults to the current directory
		-p, --port      Sets the port for the server to run on, defaults to 80
		-g, --gzip      Disables gzip
		-c, --cors      Set the CORS URL or let it default to "*"
		-s, --security	Disables default non-CORS headers
		-h, --help      Displays this help message

	Example:
		ezhs
			Runs the server with default values (no CORS)
		ezhs -p 8080 -d ./web -g -c
			Uses port 8080, serves from "./web", disables gzip, enables CORS from all domains
		ezhs -c http://www.google.com
			Enables CORS from a specific origin
`;
// put args into `args` and ignore the paths
const [, , ...args] = process.argv;
let port = 80;
// parse args
for (let i = 0; i < args.length; i++) {
    const argLowerCase = args[i].toLocaleLowerCase();
    switch (argLowerCase) {
        case '-d':
        case '--dir':
            if (i < args.length - 1 &&
                args[i + 1][0] !== '-') {
                cli_server.path(args[i + 1]);
                i++;
            }
            else {
                console.log('Error: no directory given');
                process.exit();
            }
            break;
        case '-p':
        case '--port':
            if (i < args.length - 1) {
                const nextArgNumber = Number(args[i + 1]) | 0;
                if (nextArgNumber) {
                    port = nextArgNumber;
                    i++;
                }
                else {
                    console.log('Error: port not a number');
                    process.exit();
                }
            }
            else {
                console.log('Error: no port given');
                process.exit();
            }
            break;
        case '-g':
        case '--gzip':
            cli_server.gzip();
            break;
        case '-s':
        case '--security':
            cli_server.security();
            break;
        case '-c':
        case '--cors':
            if (i < args.length - 1 &&
                args[i + 1][0] !== '-') {
                cli_server.cors(args[i + 1]);
                i++;
            }
            else {
                cli_server.cors();
            }
            break;
        case '-h':
        case '--help':
            console.log(help);
            process.exit();
        // break;
        default:
            console.log('Error: unknown option');
            console.log(help);
            process.exit();
        // break;
    }
}
cli_server.listen(port);

