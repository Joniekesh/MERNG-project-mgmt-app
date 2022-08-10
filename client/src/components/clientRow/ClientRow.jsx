import "./clientRow.css";
import { DELETE_CLIENT } from "../../mutations/clientMutations";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { GET_PROJECTS } from "../../queries/projectQueries";
import { useMutation } from "@apollo/client";

const ClientRow = ({ client, index }) => {
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: { id: client.id },
		refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
	});

	return (
		<tr key={client.id}>
			<td>{index + 1}</td>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<th>
				<i
					className="fa-solid fa-trash-can"
					style={{ color: "crimson", cursor: "pointer" }}
					onClick={deleteClient}
				></i>
			</th>
		</tr>
	);
};

export default ClientRow;
