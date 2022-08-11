import "./projectUpdateForm.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../../queries/projectQueries";
import { UPDATE_PROJECT } from "../../mutations/projectMutations";

const ProjectUpdateForm = ({ project }) => {
	const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);
	const [status, setStatus] = useState(() => {
		switch (project.status) {
			case "Not Started":
				return "new";
			case "In Progress":
				return "progress";
			case "Completed":
				return "completed";
			default:
				throw new Error(`Unknown status: ${project.status}`);
		}
	});

	const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { id: project.id, name, description, status },
		refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
	});

	const submitHandler = (e) => {
		e.preventDefault();

		if (name === "" || description === "" || status === "") {
			return alert("Please fill out all fields");
		}

		updateProject(name, description, status);
	};

	return (
		<div className="projectUpdate">
			<h2>Update Project Details</h2>
			<form onSubmit={submitHandler}>
				<div className="formGroup">
					<label>Name</label>
					<input
						type="text"
						placeholder="Project name"
						value={project.name}
						onChange={(e) => setName(e.target.name)}
					/>
				</div>
				<div className="formGroup">
					<label>Description</label>
					<input
						type="text"
						placeholder="Project Description"
						value={project.description}
						onChange={(e) => setDescription(e.target.description)}
					/>
				</div>
				<div className="formGroup">
					<label>Status</label>
					<select
						value={project.status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value="new">New</option>
						<option value="progress">In Progress</option>
						<option value="completed">Completed</option>
					</select>
				</div>
				<button type="submit" className="updateBtn">
					Update
				</button>
			</form>
		</div>
	);
};

export default ProjectUpdateForm;
