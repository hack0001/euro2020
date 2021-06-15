export const cleanCapitalise = value => {
	return value
		.trim()
		.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
};
