export const CREATE_MATCH = /* GraphQL */ `
	mutation CreateMatch($input: CreateMatchInput!) {
		createMatch(input: $input) {
			id
			homeTeamId
			awayTeamId
			groupId
			date
			kickoff
			venue
			homeTeamGoals
			awayTeamGoals
			createdAt
			updatedAt
		}
	}
`;

export const LIST_MATCHES = /* GraphQL */ `
	query listMatches {
		listMatches {
			items {
				id
				groupId
				homeTeamId
				awayTeamId
				homeTeam {
					id
					country
					flagCode
				}
				awayTeam {
					id
					country
					flagCode
				}
				matchGroup {
					id
					group
				}
				date
				kickoff
				venue
				homeTeamGoals
				awayTeamGoals
				roundId
				createdAt
				updatedAt
			}
		}
	}
`;

export const DELETE_MATCH = /* GraphQL */ `
	mutation deleteMatch($id: String!) {
		deleteMatch(id: $id)
	}
`;

export const UPDATE_MATCH = /* GraphQL */ `
	mutation updateMatch($input: UpdateMatchInput!) {
		updateMatch(input: $input) {
			id
			homeTeamId
			awayTeamId
			groupId
			date
			kickoff
			venue
			homeTeamGoals
			awayTeamGoals
			createdAt
			updatedAt
		}
	}
`;
