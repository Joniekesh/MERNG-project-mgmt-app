import { Link } from "react-router-dom";
import "./project.css";

const Project = ({ project }) => {
	return (
		<div className="project">
			<div className="projectTop">
				<h3 className="projectTitle">{project.name}</h3>
				<Link to={`/projects/${project.id}`}>
					<button className="viewBtn">View</button>
				</Link>
			</div>
			<div className="projectBottom">
				<span className="status">status:</span>
				<span
					className={
						project.status === "Completed"
							? "completed"
							: project.status === "Not Started"
							? "notStarted"
							: "inProgress"
					}
				>
					{project.status}
				</span>
			</div>
		</div>
	);
};

export default Project;
