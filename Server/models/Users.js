const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  First_Name: String,
  Last_Name: String,
  Age: Number,
  Region: String,
  city: String,
  Bike_Img: String,
});

const signUpData = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const SignupModel = mongoose.model('signupData', signUpData, 'SignUpData');

const UserModel = mongoose.model('Users', UserSchema, 'Users');
module.exports = { UserModel, SignupModel };
