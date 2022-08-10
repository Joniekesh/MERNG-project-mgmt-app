import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
	query getClients {
		clients {
			id
			name
			email
			phone
		}
	}
`;

const DELETE_CLIENT = gql`
	query deleteClient($id: ID!) {
		mutation {
			deleteClient(id: $id) {
				id
				name
				email
				phone
			}
		}
	}
`;

export { GET_CLIENTS };
