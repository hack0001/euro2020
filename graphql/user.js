export const CREATE_MATCH = /* GraphQL */ `
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			id
			userName
			teamName
			email
			createdAt
			updatedAt
		}
	}
`;
