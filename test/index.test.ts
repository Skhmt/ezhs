import { beforeAll, describe, expect, test } from 'vitest';
import ezhs from '../src/index';

const server = ezhs();
server.path('./example/public');
server.listen();

const BEFORE_ALL_TIMEOUT = 10_000;

describe('ezhs', () => {
	test('should return an object', () => {
		expect(server).toBeInstanceOf(Object);
	});
});

describe('ezhs HEAD', () => {
	let response: Response;
	let body: String;

	beforeAll(async () => {
		response = await fetch('http://localhost/', { method: 'HEAD' });
		body = await response.text();
	}, BEFORE_ALL_TIMEOUT);

	test('should have a response status 204', () => {
		expect(response.status).toBe(204);
	});
	test('should have x-content-type-options header', () => {
		expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
	});

	test('should have x-xss-protection header', () => {
		expect(response.headers.get('X-XSS-Protection')).toBe('0');
	});

	test('should have access-control-allow-methods header', () => {
		expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET, HEAD');
	});

	test('should have access-control-allow-headers header', () => {
		expect(response.headers.get('Access-Control-Allow-Headers')).toBe('X-Requested-With, Content-Type, Content-Encoding');
	});

	test('should have access-control-allow-credentials header', () => {
		expect(response.headers.get('Access-Control-Allow-Credentials')).toBe('false');
	});

	test('should have cross-origin-resource-policy header', () => {
		expect(response.headers.get('Cross-Origin-Resource-Policy')).toBe('same-site');
	});

	test('should have cross-origin-embedder-policy header', () => {
		expect(response.headers.get('Cross-Origin-Embedder-Policy')).toBe('require-corp');
	});

	test('should have referrer-policy header', () => {
		expect(response.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
	});

	test('should have server header', () => {
		expect(response.headers.get('Server')).toBe('webserver');
	});

	test('should have permissions-policy header', () => {
		expect(response.headers.get('Permissions-Policy')).toBe('geolocation=(), camera=(), microphone=(), display-capture=()');
	});

	test('should have content-security-policy header', () => {
		expect(response.headers.get('Content-Security-Policy')).toBe('default-src \'self\' \'unsafe-inline\'; frame-ancestors \'self\'; form-action \'self\';');
	});
});

describe('ezhs GET -> 404', () => {
	let response: Response;
	let body: String;

	beforeAll(async () => {
		response = await fetch('http://localhost/foo.html');
		body = await response.text();
	}, BEFORE_ALL_TIMEOUT);

	test('should have a response status 404', () => {
		expect(response.status).toBe(404);
	});

	test('should have x-content-type-options header', () => {
		expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
	});

	test('should have x-xss-protection header', () => {
		expect(response.headers.get('X-XSS-Protection')).toBe('0');
	});

	test('should have access-control-allow-methods header', () => {
		expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET, HEAD');
	});

	test('should have access-control-allow-headers header', () => {
		expect(response.headers.get('Access-Control-Allow-Headers')).toBe('X-Requested-With, Content-Type, Content-Encoding');
	});

	test('should have access-control-allow-credentials header', () => {
		expect(response.headers.get('Access-Control-Allow-Credentials')).toBe('false');
	});

	test('should have cross-origin-resource-policy header', () => {
		expect(response.headers.get('Cross-Origin-Resource-Policy')).toBe('same-site');
	});

	test('should have cross-origin-embedder-policy header', () => {
		expect(response.headers.get('Cross-Origin-Embedder-Policy')).toBe('require-corp');
	});

	test('should have referrer-policy header', () => {
		expect(response.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
	});

	test('should have server header', () => {
		expect(response.headers.get('Server')).toBe('webserver');
	});

	test('should have permissions-policy header', () => {
		expect(response.headers.get('Permissions-Policy')).toBe('geolocation=(), camera=(), microphone=(), display-capture=()');
	});

	test('should have content-security-policy header', () => {
		expect(response.headers.get('Content-Security-Policy')).toBe('default-src \'self\' \'unsafe-inline\'; frame-ancestors \'self\'; form-action \'self\';');
	});
});

describe('ezhs GET -> 200 (gzip)', () => {
	let response: Response;
	let body: String;

	beforeAll(async () => {
		response = await fetch('http://localhost/');
		body = await response.text();
	}, BEFORE_ALL_TIMEOUT);

	test('should have a response status 200', () => {
		expect(response.status).toBe(200);
	});

	test('should have body', () => {
		expect(body).toContain('hello world');
	});

	test('should have content-type header', () => {
		expect(response.headers.get('Content-Type')).toBe('text/html; charset=UTF-8');
	});

	test('should have content-encoding header', () => {
		expect(response.headers.get('Content-Encoding')).toBe('gzip');
	});

	test('should have transfer-encoding header', () => {
		expect(response.headers.get('Transfer-Encoding')).toBe('chunked');
	});

	test('should have x-content-type-options header', () => {
		expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
	});

	test('should have x-xss-protection header', () => {
		expect(response.headers.get('X-XSS-Protection')).toBe('0');
	});

	test('should have access-control-allow-methods header', () => {
		expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET, HEAD');
	});

	test('should have access-control-allow-headers header', () => {
		expect(response.headers.get('Access-Control-Allow-Headers')).toBe('X-Requested-With, Content-Type, Content-Encoding');
	});

	test('should have access-control-allow-credentials header', () => {
		expect(response.headers.get('Access-Control-Allow-Credentials')).toBe('false');
	});

	test('should have cross-origin-resource-policy header', () => {
		expect(response.headers.get('Cross-Origin-Resource-Policy')).toBe('same-site');
	});

	test('should have cross-origin-embedder-policy header', () => {
		expect(response.headers.get('Cross-Origin-Embedder-Policy')).toBe('require-corp');
	});

	test('should have referrer-policy header', () => {
		expect(response.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
	});

	test('should have server header', () => {
		expect(response.headers.get('Server')).toBe('webserver');
	});

	test('should have permissions-policy header', () => {
		expect(response.headers.get('Permissions-Policy')).toBe('geolocation=(), camera=(), microphone=(), display-capture=()');
	});

	test('should have content-security-policy header', () => {
		expect(response.headers.get('Content-Security-Policy')).toBe('default-src \'self\' \'unsafe-inline\'; frame-ancestors \'self\'; form-action \'self\';');
	});
});

describe('ezhs POST', () => {
	let response: Response;
	let body: String;

	beforeAll(async () => {
		response = await fetch('http://localhost/', { method: 'POST', body: 'hello world' });
		body = await response.text();
	}, BEFORE_ALL_TIMEOUT);

	test('should have a response status 405', () => {
		expect(response.status).toBe(405);
	});

	test('should have x-content-type-options header', () => {
		expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
	});

	test('should have x-xss-protection header', () => {
		expect(response.headers.get('X-XSS-Protection')).toBe('0');
	});

	test('should have access-control-allow-methods header', () => {
		expect(response.headers.get('Access-Control-Allow-Methods')).toBe('GET, HEAD');
	});

	test('should have access-control-allow-headers header', () => {
		expect(response.headers.get('Access-Control-Allow-Headers')).toBe('X-Requested-With, Content-Type, Content-Encoding');
	});

	test('should have access-control-allow-credentials header', () => {
		expect(response.headers.get('Access-Control-Allow-Credentials')).toBe('false');
	});

	test('should have cross-origin-resource-policy header', () => {
		expect(response.headers.get('Cross-Origin-Resource-Policy')).toBe('same-site');
	});

	test('should have cross-origin-embedder-policy header', () => {
		expect(response.headers.get('Cross-Origin-Embedder-Policy')).toBe('require-corp');
	});

	test('should have referrer-policy header', () => {
		expect(response.headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
	});

	test('should have server header', () => {
		expect(response.headers.get('Server')).toBe('webserver');
	});

	test('should have permissions-policy header', () => {
		expect(response.headers.get('Permissions-Policy')).toBe('geolocation=(), camera=(), microphone=(), display-capture=()');
	});

	test('should have content-security-policy header', () => {
		expect(response.headers.get('Content-Security-Policy')).toBe('default-src \'self\' \'unsafe-inline\'; frame-ancestors \'self\'; form-action \'self\';');
	});
});

describe('ezhs PUT', () => {
	let response: Response;
	let body: String;

	beforeAll(async () => {
		response = await fetch('http://localhost/', { method: 'PUT', body: 'hello world' });
		body = await response.text();
	}, BEFORE_ALL_TIMEOUT);

	test('should have a response status 405', () => {
		expect(response.status).toBe(405);
	});
});

describe('ezhs DELETE', () => {
	let response: Response;
	let body: String;

	beforeAll(async () => {
		response = await fetch('http://localhost/', { method: 'DELETE', body: 'hello world' });
		body = await response.text();
	}, BEFORE_ALL_TIMEOUT);

	test('should have a response status 405', () => {
		expect(response.status).toBe(405);
	});
});

describe('ezhs OPTIONS', () => {
	let response: Response;
	let body: String;

	beforeAll(async () => {
		response = await fetch('http://localhost/', { method: 'OPTIONS', body: 'hello world' });
		body = await response.text();
	}, BEFORE_ALL_TIMEOUT);

	test('should have a response status 405', () => {
		expect(response.status).toBe(405);
	});
});

describe('ezhs PATCH', () => {
	let response: Response;
	let body: String;

	beforeAll(async () => {
		response = await fetch('http://localhost/', { method: 'PATCH', body: 'hello world' });
		body = await response.text();
	}, BEFORE_ALL_TIMEOUT);

	test('should have a response status 405', () => {
		expect(response.status).toBe(405);
	});
});