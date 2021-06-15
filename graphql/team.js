export const CREATE_TEAM = /* GraphQL */ `
	mutation CreateTeam($input: CreateTeamInput!) {
		createTeam(input: $input) {
			id
			teamName
			country
			groupId
			flagCode
			createdAt
			updatedAt
		}
	}
`;

export const LIST_TEAMS = /* GraphQL */ `
	query listTeams {
		listTeams {
			items {
				id
				teamName
				country
				groupId
				flagCode
				createdAt
				updatedAt
			}
		}
	}
`;
