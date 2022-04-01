import React from "react";
import { Route, Routes } from "react-router-dom";

// components
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import TodoList from "./components/TodoList";

// specified routes to the different components
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/app" element={<TodoList />} />
			</Routes>
		</div>
	);
}

export default App;

/* references: 

My own work from level 3 task 7

*/
