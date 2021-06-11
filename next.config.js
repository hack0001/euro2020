// const withBundleAnalyzer = require("@next/bundle-analyzer")({
// 	enabled: process.env.ANALYZE === "true",
// });
// module.exports = withBundleAnalyzer({});
module.exports = {
	target: "serverless",
	future: {
		webpack5: true,
	},
	images: {
		domains: [
			"assets.wealthmack.com",
			"content-factory-media.s3.eu-west-1.amazonaws.com",
			"media0.giphy.com",
			"media2.giphy.com",
			"media1.giphy.com",
			"media3.giphy.com",
			"media4.giphy.com",
			"media5.giphy.com",
			"media6.giphy.com",
			"media7.giphy.com",
			"media8.giphy.com",
			"media9.giphy.com",
			"media10.giphy.com",
		],
	},
	env: {
		NEXT_APP_EURO_ENDPOINT: process.env.NEXT_APP_EURO_ENDPOINT,
		NEXT_APP_EURO_API_KEY: process.env.NEXT_APP_EURO_API_KEY,
	},
	catchAllRouting: true,
};
