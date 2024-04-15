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


app.post("/user", async (req, res) => {
  try {
    
    const { error } = UserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { type, about } = req.body;
    const newUser = new Users({
      type,
      about
    });

    await newUser.save();
    res.json({ message: "Data saved successfully!" });
  } catch (err) {
    console.error("Error in saving data:", err);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = app;