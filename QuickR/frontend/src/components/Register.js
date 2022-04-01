import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

// stylesheets
import "./css/Register.css";

export default function Register() {
	/* declaring initial states that will be used to store the user's 
	input credentials */
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	/* sends a post request to the server to create a new user using the 
	user's input credentials */
	async function registerUser(event) {
		event.preventDefault();
		const response = await fetch("http://localhost:5000/app/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		});

		const data = await response.json();
		if (data.status === "ok") {
			// notifies the user if successful
			alert("Successfully registered. Please login.");
			// navigates the user to the login page
			window.location.href = "/login";
		}
	}

	// creating the UI for the user input and adding the relevant event handlers
	return (
		<div>
			<div className="registerBox">
				<h3 className="registerHeading">Register</h3>
				<form onSubmit={registerUser}>
					<TextField
						value={name}
						type="text"
						required
						label="Name"
						placeholder="Tom Jones"
						variant="standard"
						className="nameInput"
						// captures the user's name input
						onChange={(e) => setName(e.target.value)}
					/>

					<br />

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
						label="Password"
						variant="standard"
						className="passwordInput"
						// captures the user's password input
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						variant="contained"
						size="large"
						className="registerButton"
					>
						Register
					</Button>
				</form>
				<p>
					Already have an account?{" "}
					<Link to={"/login"} className="loginLink">
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}

/*references:

https://mui.com/

https://www.youtube.com/watch?v=Ejg7es3ba2k

*/
