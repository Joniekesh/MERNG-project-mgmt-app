import "./clientModal.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CLIENT } from "../../mutations/clientMutations";
import { GET_CLIENTS } from "../../queries/clientQueries";

const ClientModal = ({ setOpenClientModal }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const [addClient] = useMutation(CREATE_CLIENT, {
		variables: {
			name,
			email,
			phone,
		},
		update(cache, { data: { addClient } }) {
			const { clients } = cache.readQuery({ query: GET_CLIENTS });

			cache.writeQuery({
				query: GET_CLIENTS,
				data: { clients: [...clients, addClient] },
			});
		},
	});

	const submitHandler = (e) => {
		e.preventDefault();

		if (name === "" || email === "" || phone === "") {
			return alert("Please fill all fields");
		}

		addClient(name, email, phone);

		setName("");
		setEmail("");
		setPhone("");
		setOpenClientModal(false);
	};

	return (
		<div className="clientModal1">
			<div className="clientModalContainer">
				<h2 className="top">New Client</h2>
				<i
					className="fa-solid fa-xmark cancel"
					style={{ color: "crimson" }}
					onClick={() => setOpenClientModal(false)}
				></i>
				<hr className="line" />
				<form>
					<div className="formGroup">
						<label>Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="formGroup">
						<label>Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="formGroup">
						<label>Phone</label>
						<input
							type="text"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
					</div>
					<button type="submit" className="submitBtn" onClick={submitHandler}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default ClientModal;
