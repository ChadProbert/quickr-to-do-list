import React, { Component } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
// used Wix to create a logo
import logo from "./images/logo.png";

// stylesheets
import "./css/Welcome.css";

/* renders a basic homepage that briefly explains the purpose of 
the website and navigates the user to the register route when clicking 
the "get started" button */
export default class Welcome extends Component {
	render() {
		return (
			<div className="welcome">
				<Row>
					<Col md={4}>
						<h2 className="welcomeHeading">Hello. I'm QuickR</h2>
						<h4 className="welcomeSubHeading">Productivity Increase Tool</h4>
						<Link to={"/register"} className="registerLink">
							<Button variant="contained" className="getStartedButton">
								Get started
							</Button>
						</Link>
					</Col>
					<Col md={8}>
						<img src={logo} className="welcomeLogo" />
					</Col>
				</Row>
				<div className="aboutBox">
					<h3 className="aboutHeading">About</h3>
					<p className="aboutMessage">
						Struggling with productivity? Want to increase productivity and
						efficiency for yourself and staff members in the workplace? QuickR
						has proven to increase productivity by 10% for 90% of it's users.
						Stop Wasting time and start getting things done!
					</p>
				</div>
			</div>
		);
	}
}

/* references: 

https://www.wix.com

https://react-bootstrap.github.io/

https://v5.reactrouter.com/web/guides/quick-start

https://mui.com/

*/
