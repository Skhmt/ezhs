import timestamp from '../src/timestamp';

import { describe, test, expect } from 'vitest';

describe('timestamp', () => {
	test('should create a timestamp', () => {
		const now = new Date("2021-10-26T18:36:59");
		const time = timestamp(now);
		expect(time).toBe('[26/Oct/2021:18:36:59 -0700]');
	});
})