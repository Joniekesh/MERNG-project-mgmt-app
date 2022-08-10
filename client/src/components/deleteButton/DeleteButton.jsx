import "./deleteButton.css";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DELETE_PROJECT } from "../../mutations/projectMutations";
import { GET_PROJECTS } from "../../queries/projectQueries";

const DeleteButton = ({ projectId }) => {
	const navigate = useNavigate();

	const [deleteProject] = useMutation(DELETE_PROJECT, {
		variables: { id: projectId },
		onCompleted: () => navigate("/"),
		refetchQueries: [{ query: GET_PROJECTS }],
	});

	return (
		<div className="deleteButton">
			<button type="button" className="deleteBtn" onClick={deleteProject}>
				<i className="fa-solid fa-trash"></i>
				Delete Project
			</button>
		</div>
	);
};

export default DeleteButton;
