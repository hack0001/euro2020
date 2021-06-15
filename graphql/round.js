export const CREATE_ROUND = /* GraphQL */ `
	mutation CreateRound($input: CreateRoundInput!) {
		createRound(input: $input) {
			id
			round
			createdAt
			updatedAt
		}
	}
`;
export const LIST_ROUNDS = /* GraphQL */ `
	query listRounds {
		listRounds {
			items {
				id
				round
				createdAt
				updatedAt
			}
		}
	}
`;
