import ezhs from '../dist/index.js';

const server = ezhs();

server.path('./example/public');

server.listen();