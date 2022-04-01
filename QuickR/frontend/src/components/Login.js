import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

// stylesheets
import "./css/Login.css";

export default function Login() {
	/* declaring initial states that will be used to store the user's 
	input credentials */
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	/* sends a post request to the server to log the user in using the
	supplied (by the user) credentials */
	async function loginUser(event) {
		event.preventDefault();
		const response = await fetch("http://localhost:5000/app/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await response.json();
		if (data.user) {
			// stores the user's token in local storage
			localStorage.setItem("token", data.user);
			// notifies the user if successful
			alert("Login Successful!");
			// navigates the user to the todo app
			window.location.href = "/app";
		} else {
			alert("Please check your username and password");
		}
	}

	// creating the UI for the user input and adding the relevant event handlers
	return (
		<div>
			<div className="loginBox">
				<h3 className="loginHeading">Login</h3>
				<form onSubmit={loginUser}>
					<TextField
						value={email}
						type="email"
						required
						label="Email"
						placeholder="TomJones@gmail.com"
						variant="standard"
						className="emailInput"
						// captures the user's email input
						onChange={(e) => setEmail(e.target.value)}
					/>

					<br />

					<TextField
						value={password}
						type="password"
						required
						label="password"
						variant="standard"
						className="passwordInput"
						// captures the user's password input
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						variant="contained"
						size="large"
						className="loginButton"
					>
						login
					</Button>
				</form>
				<p>
					Create an account?{" "}
					<Link to={"/register"} className="registerLink">
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}

/*references:

https://mui.com/

https://stackoverflow.com/questions/63471931/using-history-with-react-router-dom-v6


*/
