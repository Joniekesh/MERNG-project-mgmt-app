import "./projects.css";
import Project from "../project/Project";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../queries/projectQueries";
import Loader from "../loader/Loader";

const Projects = () => {
	const { loading, error, data } = useQuery(GET_PROJECTS);

	if (loading) return <Loader />;
	if (error) return <p>Something went wrong</p>;

	return (
		<div className="projects">
			<div className="projectList">
				{data.projects.map((project) => (
					<Project project={project} key={project.id} />
				))}
			</div>
		</div>
	);
};

export default Projects;
