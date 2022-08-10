import "./home.css";
import { useState } from "react";
import Clients from "../../components/clients/Clients";
import ClientModal from "../../components/clientModal/ClientModal";
import ProjectModal from "../../components/projectModal/ProjectModal";
import Projects from "../../components/projects/Projects";

const Home = () => {
	const [openClientModal, setOpenClientModal] = useState(false);
	const [openProjectModal, setOpenProjectModal] = useState(false);

	return (
		<div className="home">
			<h1 className="title">Project Management</h1>
			<div className="modalContainer">
				<div className="clientModal" onClick={() => setOpenClientModal(true)}>
					<i className="fas fa-user"></i>
					<span>Add Client</span>
				</div>
				<div className="projectModal" onClick={() => setOpenProjectModal(true)}>
					<i className="fa-solid fa-list-check"></i>
					<p>New Project</p>
				</div>
			</div>
			<Projects />
			<Clients />
			{openClientModal && (
				<ClientModal setOpenClientModal={setOpenClientModal} />
			)}
			{openProjectModal && (
				<ProjectModal setOpenProjectModal={setOpenProjectModal} />
			)}
		</div>
	);
};

export default Home;
