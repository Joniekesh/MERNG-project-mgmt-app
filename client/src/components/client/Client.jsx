import "./client.css";
import ClientRow from "../clientRow/ClientRow";

const Client = ({ data }) => {
	return (
		<div className="client">
			{data.clients.length > 0 && (
				<table className="table">
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data.clients.map((client, index) => (
							<ClientRow key={client.id} client={client} index={index} />
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Client;
