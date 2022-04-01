const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.model");
const cors = require("cors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// connecting to the database:

// uri is stored in the .env file since it is sensitive information
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.on("error", function () {
	console.log("Could not connect to the database. Exiting now...");
	process.exit();
});

mongoose.connection.once("open", function () {
	console.log("Successfully connected to the database!");
});

// registers a user
app.post("/app/register", async (req, res) => {
	try {
		// secures the password by hashing it
		const newPassword = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			// stores the hashed password
			password: newPassword,
		});
		res.json({ status: "ok" });
	} catch (err) {
		console.log(err);
		res.json({ status: "error", error: "Duplicate email" });
	}
});

// logs a user in
app.post("/app/login", async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	});

	if (!user) {
		return { status: "error", error: "Invalid login" };
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	);

	/* signs the payload if the req.body.password matches user.password */
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			// stored in the .env file since it is sensitive information
			process.env.JWT_SECRET
		);

		return res.json({
			status: "ok",
			user: token,
		});
	} else {
		return res.json({
			status: "error",
			user: false,
		});
	}
});

// finds the user's email and returns their list of todos
app.get("/app/todos", async (req, res) => {
	const token = req.headers["x-access-token"];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const email = decoded.email;
		const user = await User.findOne({ email: email });

		return res.json({ status: "ok", todos: user.todos });
	} catch (error) {
		console.log(error);
		res.json({ status: "error", error: "invalid token" });
	}
});

// adds todo items to the user's list of todos
app.put("/app/todos", async (req, res) => {
	const token = req.headers["x-access-token"];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const email = decoded.email;
		// pushes the user's new todo to their list of todos
		await User.updateOne(
			{ email: email },
			{ $push: { todos: req.body.todos } }
		);

		return res.json({ status: "ok" });
	} catch (error) {
		console.log(error);
		res.json({ status: "error", error: "invalid token" });
	}
});

// removes a todo from the user's list of todos
app.put("/app/todos/remove", async (req, res) => {
	const token = req.headers["x-access-token"];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const email = decoded.email;
		await User.updateOne(
			{ email: email },
			{ $pull: { todos: req.body.removedtodo } }
		);

		return res.json({ status: "ok" });
	} catch (error) {
		console.log(error);
		res.json({ status: "error", error: "invalid token" });
	}
});

// port can be dynamically bound to the production environment port
const PORT = process.env.PORT || 5000;
// starting the sever
app.listen(PORT);
console.log(`Server started on PORT ${PORT}`);

/* references:

https://docs.mongodb.com/manual/reference/operator/update/push/#mongodb-update-up.-push

https://docs.mongodb.com/manual/reference/operator/update/pull/#std-label-pull-array-of-documents

https://www.youtube.com/watch?v=Ejg7es3ba2k

https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/

*/
