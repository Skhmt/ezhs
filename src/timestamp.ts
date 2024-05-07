/**
 * Creates a CLF formatted timestamp
 * [10/Oct/2000:13:55:36 -0700]
 * 
 * @returns {string} the timestamp
 */
export default function time(now: Date): string {
	const day: string = now.getDate().toString().padStart(2, '0');
	const mon: string = now.toLocaleString('default', { month: 'short' });
	const year: number = now.getFullYear();
	const hrs: string = now.getHours().toString().padStart(2, '0');
	const min: string = now.getMinutes().toString().padStart(2, '0');
	const sec: string = now.getSeconds().toString().padStart(2, '0');
	// const ms = now.getMilliseconds().toString().padStart(3, '0')

	const timeOffset: number = now.getTimezoneOffset() / 60;
	let timezone: string = timeOffset > 1 ? '-' : '+'; // this is correct, even though it seems backwards
	timezone += timeOffset.toString().padStart(2, '0').padEnd(4, '0');

	return `[${day}/${mon}/${year}:${hrs}:${min}:${sec} ${timezone}]`;
}