const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const UserRoute = require("./routes/users");

const app = express();
app.set("port", process.env.PORT || 4000);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
	res.header("Content-Type", "application/json;charset=UTF-8");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(cors({ origin: "http://localhost:3000", credentials: "include" }));

app.use(UserRoute);

mongoose.connect("mongodb://localhost:27017/GI", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
	console.log("Connected to MongoDB");

	app.listen(app.get("port"), function () {
		console.log("API server Listening on port " + app.get("port") + "!");
	});
});
