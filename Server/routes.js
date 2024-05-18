const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Users = require("./models/Users");
const joi = require("joi");
const app = express();
app.use(express.json());
app.use(cors());

const UserSchema = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  age: joi.string().required(),
  region: joi.string().required(),
  city: joi.string().required(),
  bike_image_link: joi.string().required(),
});

module.exports=UserSchema