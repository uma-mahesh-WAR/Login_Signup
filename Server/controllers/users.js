const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = require("../models/users");

const signup = (req, res, next) => {
	bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
		if (err) {
			res.json({
				error: err,
			});
		}
		let signUp = new users({
			userName: req.body.userName,
			password: hashedPass,
			mobileNumber: req.body.mobileNumber,
			email: req.body.email,
		});
		signUp
			.save()
			.then((user) => {
				res.status(200).send("SignUp successful...Please LogIn.");
			})
			.catch((err) => {
				res.status(400).send("Some error occured...Please try again.");
			});
	});
};

const login = (req, res, next) => {
	var userName = req.body.userName;
	var pass = req.body.password;

	users.findOne({ userName: userName }).then((usr) => {
		if (usr) {
			bcrypt.compare(pass, usr.password, function (err, result) {
				if (err) {
					res.json({
						status: 204,
						message: err.message,
					});
				}
				if (result) {
					let token = jwt.sign({ userName: usr.userName }, "UmaMahesh");
					res.cookie("clientToken", token, { maxAge: 60 * 60 * 1000 });
					res.json({
						status: 200,
						message: "Logging In...",
					});
				} else {
					res.json({
						status: 204,
						message: "Password does not match...Please check your password.",
					});
				}
			});
		} else {
			res.json({
				status: 204,
				message: "User not found...Please Signup.",
			});
		}
	});
};

const allusers = (req, res, next) => {
	const clientToken = req.cookies.clientToken;
	if (clientToken) {
		jwt.verify(clientToken, "UmaMahesh", (err, decodedToken) => {
			if (err) {
				res.status(204).send(err.message);
			} else {
				users
					.find(
						{},
						{
							userName: 1,
							email: 1,
							mobileNumber: 1,
						}
					)
					.exec((err, data) => {
						if (err) {
							res.status(400).send("Error occured");
						} else {
							res.json({ data, user: decodedToken.userName });
						}
					});
			}
		});
	} else {
		res.status(204).send("Please Login");
	}
	// users
	// 	.find(
	// 		{},
	// 		{
	// 			userName: 1,
	// 			email: 1,
	// 			mobileNumber: 1,
	// 		}
	// 	)
	// 	.exec((err, data) => {
	// 		if (err) {
	// 			res.status(400).send("Error occured");
	// 		} else {
	// 			res.json(data);
	// 		}
	// 	});
};

const validateUserName = (req, res, next) => {
	users.findOne({ userName: req.body.userName }).then((user) => (user ? res.sendStatus(204) : res.sendStatus(200)));
};

module.exports = {
	signup,
	login,
	allusers,
	validateUserName,
};
