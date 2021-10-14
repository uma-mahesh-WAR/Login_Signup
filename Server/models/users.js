var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName: { type: String },
  password: { type: String },
  email: { type: String },
  mobileNumber: { type: String },
});

module.exports = mongoose.model("users", UserSchema, "users");
