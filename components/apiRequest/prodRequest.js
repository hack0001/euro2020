const prodApiRequest = async queryData => {
	const res = await fetch(
		process.env.NEXT_APP_EURO_ENDPOINT, //process.env.REACT_APP_PROD_ENDPOINT,
		{
			method: "POST",
			body: JSON.stringify(queryData),
			headers: {
				Accept: "application/json",
				"x-api-key": process.env.NEXT_APP_EURO_API_KEY, //process.env.REACT_APP_PROD_API_KEY,
			},
		},
	);

	const json = await res.json();
	if (json.errors) {
		console.error(json.errors);
		throw new Error("Failed to fetch API");
	}
	return json;
};

export default prodApiRequest;
