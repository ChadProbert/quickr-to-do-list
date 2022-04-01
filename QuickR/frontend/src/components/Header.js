import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";

// stylesheets
import "./css/Header.css";

/* basic reusable component that holds a logo  */
const Header = () => (
	<AppBar position="static" className="appBar">
		<Toolbar>
			<Link to="/">
				<img src={logo} className="appLogo" />
			</Link>
		</Toolbar>
	</AppBar>
);

export default Header;

/* references:

https://mui.com/components/app-bar/

my own work from level 2 task 21

*/
