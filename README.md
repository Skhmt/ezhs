# Easy HTTP Server

- Only accepts GET/HEAD requests
- Applies gzip encoding when appropriate (1.4KB <= file size <= 10MB, and in a text file format more-or-less)
- Your reverse proxy should be handling SSL and caching
- Sane defaults
- No current option for custom HTTP error pages

## Defaults

### CORS headers

- `Access-Control-Allow-Methods: GET, HEAD`
- `Access-Control-Allow-Headers: X-Requested-With, Content-Type, Content-Encoding`
- `Access-Control-Allow-Credentials: false`

### Other security headers

- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 0`
- `Cross-Origin-Resource-Policy: same-site`
- `Cross-Origin-Embedder-Policy: require-corp`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Server: webserver`
- `Permissions-Policy: geolocation=(), camera=(), microphone=(), display-capture=()`
- `Content-Security-Policy: default-src 'self' 'unsafe-inline'; frame-ancestors 'self'; form-action 'self';`

## Use in node.js

`.listen(port_number)` - Starts the server, default: 80

`.close(callback)` - Closes the server, calls the callback function when when the server closes (after all connections are finished)

`.path('/path/to/static/files')` - Defaults to the current directory

`.gzip()` - Disable gzip compression

`.security()` - Disable non-CORS security headers

`.cors('optional url')` - Sets the CORS URL; sending no string defaults to "*"

`.headers([ insert header arrays here ])` - Overwrites any other headers besides the CORS URL (if it's set)

### Examples in js

```
import ezhs from 'ezhs'
const server = ezhs();
server.listen();
```
The simplest example, listens on the default port 80 and hosts files in "./public/"

```
server.path('./files').listen(8080);
```
Listens on port 8080 and hosts files in "./files/"

```
server.headers([
    ['X-Frame-Options', 'DENY'],
    ['X-XSS-Protection', '0'],
    ['X-Content-Type-Options', 'nosniff'],
    ['Referrer-Policy', 'strict-origin-when-cross-origin'],
]).listen();
```
Listens on port 80, includes XSS headers

## Use via commandline

`npm i -g ezhs`

`ezhs`

```
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
```

## Testing

`npm run test`

## Todo

- custom error pages
- https maybe