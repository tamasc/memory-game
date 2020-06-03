function getTimeFromTimestamp(timestamp: number): string {
	const date = new Date(timestamp);
	return `${date.getMinutes()} : ${date.getSeconds()}`;
}

export { getTimeFromTimestamp };
