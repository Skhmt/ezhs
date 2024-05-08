#!/usr/bin/env node

import ezhs, { ezServer } from './index';

const server: ezServer = ezhs();

const help: string = `
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

let port: number = 80;

// parse args
for (let i: number = 0; i < args.length; i++) {
	const argLowerCase: string = args[i].toLocaleLowerCase();
	switch (argLowerCase) {
		case '-d':
		case '--dir':
			if (
				i < args.length - 1 &&
				args[i + 1][0] !== '-'
			) {
				server.path(args[i + 1]);
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
				const nextArgNumber: number = Number(args[i + 1]) | 0;
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
			server.gzip();
			break;
		case '-s':
		case '--security':
			server.security();
			break;
		case '-c':
		case '--cors':
			if (
				i < args.length - 1 &&
				args[i + 1][0] !== '-'
			) {
				server.cors(args[i + 1]);
				i++;
			}
			else {
				server.cors();
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

server.listen(port);