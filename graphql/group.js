export const CREATE_GROUP = /* GraphQL */ `
	mutation CreateGroup($input: CreateGroupInput!) {
		createGroup(input: $input) {
			id
			group
			groupWinner
			createdAt
			updatedAt
		}
	}
`;
export const LIST_GROUPS = /* GraphQL */ `
	query listGroups {
		listGroups {
			items {
				id
				group
				groupWinner
				createdAt
				updatedAt
			}
		}
	}
`;
