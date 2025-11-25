export const serverToFrontKey = (key: string): string => {
	// snake_case → camelCase
	return key.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
};
