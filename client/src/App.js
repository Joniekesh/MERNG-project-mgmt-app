import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import ProjectDetails from "./pages/projectDetails/ProjectDetails";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
	uri: "http://localhost:5000/graphql",
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/projects/:id" element={<ProjectDetails />}></Route>
				</Routes>
			</Router>
		</ApolloProvider>
	);
}

export default App;
