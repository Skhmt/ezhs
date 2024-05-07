/**
 * A function that splits a string based on a given character and returns the front part of the string.
 *
 * @param {string | undefined} fullString - The string to be split.
 * @param {string} characterToSplit - The character used to split the string.
 * @return {string} The front part of the string before the character, or the whole string if the character is not found.
 */
export default function frontSplit(fullString: string | undefined, characterToSplit: string): string {
	if (typeof fullString == 'undefined') return '';
	const index = fullString.indexOf(characterToSplit);
	return (index > -1) ? fullString.substring(0, index) : fullString;
}