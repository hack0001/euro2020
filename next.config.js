module.exports = {
	target: "serverless",
	future: {
		webpack5: true,
	},
	env: {
		NEXT_APP_EURO_ENDPOINT: process.env.NEXT_APP_EURO_ENDPOINT,
		NEXT_APP_EURO_API_KEY: process.env.NEXT_APP_EURO_API_KEY,
	},
	catchAllRouting: true,
};
