export const CREATE_PREDICTION = /* GraphQL */ `
	mutation CreatePrediction($input: CreatePredictionInput!) {
		createPrediction(input: $input) {
			id
			matchId
			userId
			predictedHomeGoals
			predictedAwayGoals
			createdAt
			updatedAt
		}
	}
`;
