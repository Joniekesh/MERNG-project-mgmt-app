const dotenv = require("dotenv");
dotenv.config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./shema/schema");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");

const express = require("express");
const app = express();

connectDB();

app.use(cors());

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === "development",
	})
);

const PORT = process.env.PORT || 5000;
app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} MODE on PORT ${PORT}`.yellow.bold
	)
);
