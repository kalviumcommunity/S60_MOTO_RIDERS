const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    First_Name: String,
    Last_Name: String,
    Age: Number,
    Region: String,
    city: String,
    Bike_Img: String
})

const UserModel = mongoose.model('Users', UserSchema, "Users");
module.exports = UserModel;