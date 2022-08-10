import "./clients.css";
import Client from "../client/Client";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/clientQueries";
import Loader from "../loader/Loader";

const Clients = () => {
	const { loading, error, data } = useQuery(GET_CLIENTS);
	if (loading) return <Loader />;
	if (error) return <p>Something went wrong</p>;

	return (
		<div className="clients">
			<Client loading={loading} error={error} data={data} />
		</div>
	);
};
export default Clients;
