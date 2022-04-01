import React, { useEffect, useState } from "react";
import Header from "./Header";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import { TextField } from "@material-ui/core";
import FlipMove from "react-flip-move";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import jwt from "jsonwebtoken";

// stylesheets
import "./css/TodoList.css";

// todo check and make comments
const TodoList = () => {
	// declaring initial states and change state values
	const [todos, setTodos] = useState([]);
	const [tempTodo, setTempTodos] = useState("");

	// captures the user's new todo input
	function handleTodos(e) {
		setTempTodos(e.target.value);
	}

	/* sends a get request to the server to get the user's list of todos and 
	 set them to state so that they can be mapped out */
	async function populateTodos() {
		const req = await fetch("http://localhost:5000/app/todos", {
			// uses the JWT that is supplied to the user when they login
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		});

		const data = await req.json();
		if (data.status === "ok") {
			setTodos(data.todos);
			console.log(data.todos);
		} else {
			alert(data.error);
		}
	}

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = jwt.decode(token);
			/* if the user navigates to localhost:3000/app and is not logged in then 
			they will be redirected to localhost:3000/ so that they must first register 
			and login before using the app */
			if (!user) {
				localStorage.removeItem("token");
				window.location.href = "/";
			} else {
				// displays the user's todos
				populateTodos();
			}
		}
	}, []);

	/* sends a put request to the server to push the user's new todo 
	input into the array of todos */
	function updateTodos(event) {
		event.preventDefault();
		const req = fetch("http://localhost:5000/app/todos", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				// uses the JWT that is supplied to the user when they login
				"x-access-token": localStorage.getItem("token"),
			},
			//tempTodo is set by the handleTodos function (line 20-22)
			body: JSON.stringify({
				todos: tempTodo,
			}),
		})
			.then((res) => res.json())
			// repopulates the list of todos to show the new todo added to the list
			.then(() => populateTodos());
	}

	// removes a todo that is marked as completed (by the user) from the array of todos
	async function completedTodo(e) {
		// captures the completed todo
		const completed = await e.target.value;
		const req = fetch("http://localhost:5000/app/todos/remove", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({
				removedtodo: completed,
			}),
		})
			.then((res) => res.json())
			// repopulates the list of todos to show the updated list of todos
			.then(() => populateTodos());
	}

	/* adding the relevant event handlers and creating the UI */
	return (
		<div>
			<Header />
			<form className="addTodoForm" onSubmit={updateTodos}>
				<TextField
					onChange={handleTodos}
					type="text"
					id="outlined-required"
					label="New Todo"
					className="addTodoInput"
				/>
				<br />
				<Button type="submit" variant="contained" className="addButton">
					add
				</Button>
			</form>

			<h2 className="todosHeading">Todos</h2>

			{!todos.length ? (
				// displayed if there are no todos in the user's list of todos
				<p className="noTodos">No todos added</p>
			) : (
				// FlipMove is an animation used when removing and adding todos
				<ul>
					<FlipMove duration={350} easing="ease-out">
						{todos.map((todo, index) => (
							<li key={index}>
								<div className="todoDisplayBox">
									<p className="todosAdded">
										{todo}
										<Radio
											value={todo}
											className="completeButton"
											icon={<CheckBoxIcon />}
											checkedIcon={<CheckBoxIcon style={{ color: "grey" }} />}
											onClick={completedTodo}
										></Radio>
									</p>
								</div>
							</li>
						))}
					</FlipMove>
				</ul>
			)}
		</div>
	);
};

export default TodoList;

/* references: 

https://mui.com/

my own work from level 2 task 21

my own work from level 3 task 7

https://www.youtube.com/watch?v=Ejg7es3ba2k

https://github.com/joshwcomeau/react-flip-move

*/
