import React, { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import axios from "axios";

import Error from "../../components/Error";
import Message from "../../components/Message";

const Signup = () => {
	const [userName, setuserName] = useState("");
	const [password, setpassword] = useState("");
	const [email, setemail] = useState("");
	const [mobileNumber, setmobileNumber] = useState("");
	const [register, setregister] = useState(false);
	const [error, seterror] = useState(false);
	const [err, seterr] = useState("");
	const [userNameTaken, setuserNameTaken] = useState(false);

	const handleOnChangeUserName = (e) => {
		setuserName(e.target.value);
	};

	const handleOnChangePassword = (e) => {
		setpassword(e.target.value);
	};

	const handleOnChangeEmail = (e) => {
		setemail(e.target.value);
	};

	const handleOnChangeMobileNumber = (e) => {
		setmobileNumber(e.target.value);
	};

	const handleOnBlur = async (e) => {
		setuserName(e.target.value);
		const data = {
			userName: userName,
		};
		const isUsernameTaken = await axios.post("http://localhost:4000/validateUserName", data).then((exist) => exist.status);
		if (isUsernameTaken === 204) {
			setuserNameTaken(true);
			seterror(true);
			seterr("userName alreay taken. Please use a different one.");
		} else {
			setuserNameTaken(false);
			seterror(false);
			seterr("");
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const data = {
			userName,
			password,
			email,
			mobileNumber,
		};
		console.log(data);

		const registerStatus = await axios.post("http://localhost:4000/signup", data).then((res) => res.status);
		if (registerStatus === 200) {
			setuserName("");
			setpassword("");
			setemail("");
			setmobileNumber("");
			setregister(true);
			seterror(false);
		} else {
			seterror(true);
			seterr("Error in Registration");
			setregister(false);
		}
	};

	return (
		<div className="Registration">
			<h1> Sign Up </h1>
			<form onSubmit={onSubmit}>
				<div>
					<div className="fields">
						<p> User Name </p> <input type="text" className={classNames({ error: userNameTaken })} value={userName} name="Username" onBlur={handleOnBlur} onChange={handleOnChangeUserName} autoComplete="Username" required />
					</div>
					<div className="fields">
						<p> Password </p> <input type="password" value={password} name="Password" onChange={handleOnChangePassword} autoComplete="password" required />
					</div>
					<div className="fields">
						<p> Email </p> <input type="email" value={email} name="Email" onChange={handleOnChangeEmail} required />
					</div>
					<div className="fields">
						<p> Mobile Number </p> <input type="tel" value={mobileNumber} name="MobileNumber" onChange={handleOnChangeMobileNumber} />
					</div>
					<div className="buttons">
						<button type="submit" className="btn btn-primary" disabled={userNameTaken}>
							Sign Up
						</button>
						<Link to="/"> Login </Link>
					</div>
				</div>
			</form>
			{error && <Error message={err} />} {register && <Message message="Registered Successfully. Please Login." />}
		</div>
	);
};

export default Signup;
