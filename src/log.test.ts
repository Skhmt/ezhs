import { describe, test, expect, vi } from "vitest";

import { IncomingMessage, ServerResponse } from "http";

import log from "./log";

describe("log", () => {
	// const originalConsoleLog = console.log;
	const consoleMock = vi.spyOn(console, "log").mockImplementation((...args) => undefined);

	test("should log in common log format", () => {
		const request = {
			socket: {
				remoteAddress: "127.0.0.1"
			},
			method: "GET",
			httpVersion: "1.1",
		};
		const response = {
			statusCode: 200
		};
		const requestPath = "/index.html";
		const runTime = 4;
		const length = 70;
		log(request as IncomingMessage, response as ServerResponse, requestPath, new Date("January 26, 2021 18:36:59"), runTime, length);
		expect(consoleMock).toHaveBeenCalledOnce();
		expect(consoleMock).toHaveBeenLastCalledWith("127.0.0.1 - - [26/Jan/2021:18:36:59 -0800] \"GET /index.html HTTP/1.1\" 200 70 4ms");
	});
})