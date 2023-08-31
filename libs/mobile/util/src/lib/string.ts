export function removeKebabCase(str: string): string {
	return str.split('-').join(' ');
}

export function initCap(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
