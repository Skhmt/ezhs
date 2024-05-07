import { IncomingMessage, ServerResponse } from 'http';
import time from './timestamp.js';

/**
 * Logs in common log format: 127.0.0.1 - - [26/Jan/2021:18:36:59 -0800] "GET /index.html HTTP/1.1" 200 70
 * @param {*} request
 * @param {*} response
 * @param {string} requestPath
 * @param {number} startTime
 */
export default function log(request: IncomingMessage, response: ServerResponse, requestPath: string, now: Date, runTime: number, length?: number): void {
	const outputBuilder: Array<string> = [
		request.socket?.remoteAddress || '-',
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