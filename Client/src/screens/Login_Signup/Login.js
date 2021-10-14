import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Message from "../../components/Message";
import Error from "../../components/Error";

const Login = () => {
	const [userName, setuserName] = useState("");
	const [password, setpassword] = useState("");
	const [error, seterror] = useState(false);
	const [loginSuccess, setloginSuccess] = useState(false);
	const [msg, setmsg] = useState("");

	const handleOnChangeUserName = (e) => {
		setuserName(e.target.value);
	};
	const handleOnChangePassword = (e) => {
		setpassword(e.target.value);
	};
	const onSubmit = async (e) => {
		const data = {
			userName: userName,
			password: password,
		};
		console.log(data);
		const loginResult = await axios
			.post("http://localhost:4000/login", data, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res);
				return res.data;
			});
		if (loginResult.status !== 200) {
			setmsg(loginResult.message);
			seterror(true);
			setloginSuccess(false);
		} else {
			setmsg(loginResult.message);
			seterror(false);
			setloginSuccess(true);
		}
	};

	return (
		<div className="Login">
			<h1> Login </h1>
			<form onSubmit={onSubmit}>
				<div>
					<div className="fields">
						<p> Username </p> <input type="text" name="Username" onChange={handleOnChangeUserName} autoComplete="Username" required />
					</div>
					<div className="fields">
						<p> Password </p> <input type="password" name="Password" onChange={handleOnChangePassword} autoComplete="Password" required />
					</div>
					<div className="buttons">
						<button type="button" onClick={onSubmit} className="btn btn-primary">
							Login
						</button>
						<Link to="/signup">Signup</Link>
					</div>
				</div>
			</form>
			{loginSuccess && <Message message={msg} />} {error && <Error message={msg} />}
		</div>
	);
};

export default Login;
