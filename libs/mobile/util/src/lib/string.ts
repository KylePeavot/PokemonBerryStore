export function removeKebabCase(str: string): string {
	return str.split('-').join(' ');
}

export function initCapInitialWord(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function initCapAllWords(str: string): string {
	return str
		.split(' ')
		.map((word) => initCapInitialWord(word))
		.join(' ');
}
