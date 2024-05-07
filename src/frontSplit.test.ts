import { describe, test, expect } from "vitest";

import frontSplit from "./frontSplit";

describe("frontSplit", () => {
	test("should return the whole string if the character is not found", () => {
		const fullString = "Hello World";
		const characterToSplit = "x";
		const result = frontSplit(fullString, characterToSplit);
		expect(result).toBe(fullString);
	});

	test("should return the front part of the string before the first instance of the split character", () => {
		const fullString = "Hello World";
		const characterToSplit = "l";
		const result = frontSplit(fullString, characterToSplit);
		expect(result).toBe("He");
	});

	test("should return an empty string if the first character is the split character", () => {
		const fullString = "Hello World";
		const characterToSplit = "H";
		const result = frontSplit(fullString, characterToSplit);
		expect(result).toBe("");
	});
})