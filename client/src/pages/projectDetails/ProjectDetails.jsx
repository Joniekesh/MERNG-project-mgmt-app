import "./projectDetails.css";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../queries/projectQueries";
import Loader from "../../components/loader/Loader";
import ProjectUpdateForm from "../../components/projectUpdateForm/ProjectUpdateForm";
import DeleteButton from "../../components/deleteButton/DeleteButton";

const ProjectDetails = () => {
	const { id } = useParams();

	const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

	if (loading) return <Loader />;
	if (error) return <p>Something went wrong</p>;

	return (
		<div className="projectDetails">
			<h1 className="projectDetailsTitle">Project Management</h1>
			<div className="projectDetailsDiv">
				<div className="projectInfo">
					<Link to="/">
						<button type="button">Go Back</button>
					</Link>
					<h2 className="projectName">{data.project.name}</h2>
					<p className="projectDesc">{data.project.description}</p>
					<div className="projectStatus">
						<h3>Project Status</h3>
						<p
							className={
								data.project.status === "Completed"
									? "completed"
									: data.project.status === "Not Started"
									? "notStarted"
									: "inProgress"
							}
						>
							{data.project.status}
						</p>
					</div>
				</div>
				<div className="clientInfo">
					<h2>Client Information</h2>
					<ul className="infoDiv">
						<li>
							<div className="userDetails">
								<i className="fas fa-user"></i>
								<span>{data.project.client.name}</span>
							</div>
						</li>
						<li>
							<div className="userDetails">
								<i className="fa-solid fa-envelope"></i>
								<span>{data.project.client.email}</span>
							</div>
						</li>
						<li>
							<div className="userDetails">
								<i className="fa-solid fa-phone"></i>
								<span>{data.project.client.phone}</span>
							</div>
						</li>
					</ul>
				</div>
				<ProjectUpdateForm project={data.project} />
				<DeleteButton projectId={id} />
			</div>
		</div>
	);
};

export default ProjectDetails;
