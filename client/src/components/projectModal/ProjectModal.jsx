import "./projectModal.css";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { ADD_PROJECT } from "../../mutations/projectMutations";
import { GET_PROJECTS } from "../../queries/projectQueries";

const ProjectModal = ({ setOpenProjectModal }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [clientId, setClientId] = useState("");
	const [status, setStatus] = useState("new");

	const [addProject] = useMutation(ADD_PROJECT, {
		variables: { name, description, clientId, status },
		update(cache, { data: { addProject } }) {
			const { projects } = cache.readQuery({ query: GET_PROJECTS });
			cache.writeQuery({
				query: GET_PROJECTS,
				data: { projects: [...projects, addProject] },
			});
		},
	});

	const { loading, error, data } = useQuery(GET_CLIENTS);

	const submitHandler = (e) => {
		e.preventDefault();

		if (name === "" || description === "" || status === "") {
			return alert("Please fill in all fields");
		}

		addProject(name, description, status, clientId);

		setOpenProjectModal(false);

		setName("");
		setDescription("");
		setClientId("");
		setStatus("");
	};

	if (loading) return null;
	if (error) return "Something went wrong";

	return (
		<>
			{!loading && !error && (
				<div className="projectModal1">
					<div className="projectModalContainer">
						<h2 className="top">New Project</h2>
						<i
							className="fa-solid fa-xmark cancel"
							style={{ color: "crimson" }}
							onClick={() => setOpenProjectModal(false)}
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
								<label>Description</label>
								<input
									type="text"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</div>

							<div className="formGroup">
								<label>Status</label>
								<select
									className="select"
									value={status}
									onChange={(e) => setStatus(e.target.value)}
								>
									<option value="new">New</option>
									<option value="progress">In Progress</option>
									<option value="completed">Completed</option>
								</select>
							</div>

							<div className="formGroup">
								<label>Client</label>
								<select
									className="select"
									value={clientId}
									onChange={(e) => setClientId(e.target.value)}
								>
									{data.clients.map((client) => (
										<option key={client.id} value={client.id}>
											{client.name}
										</option>
									))}
								</select>
							</div>

							<button
								type="submit"
								className="submitBtn"
								onClick={submitHandler}
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default ProjectModal;
