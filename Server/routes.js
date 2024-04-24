const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Users = require("./models/Users");
const joi = require("joi");
const app = express();
app.use(express.json());
app.use(cors());

const UserSchema = joi.object({
  type: joi.string().required(),
  about: joi.string().required()
});