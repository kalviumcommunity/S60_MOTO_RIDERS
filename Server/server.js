const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { UserModel, SignupModel } = require('./models/Users');

const app = express();
const PORT = 4050;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.get('/getUsers', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/getUsers/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/userdata/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const users = await UserModel.findOne({ City: city });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/form', async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

app.put('/updateUser/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body);
    if (!updatedUser) {
      return res.status(404).json('User not found');
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

app.delete('/deleteUser/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json('User not found');
    }
    res.json(deletedUser);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SignupModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User is not registered' });
    }
    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    const token = generateToken(user._id);
    res.json({
      shouldLogin: true,
      message: 'Logged in successfully',
      token: token,
      id: user._id,
    });
  } catch (error) {
    console.error('Error in user login:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// SignUp Route
app.post('/signUp', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailPresent = await SignupModel.findOne({ email });
    if (emailPresent) {
      return res
        .status(400)
        .json({ error: 'User with this email already exists' });
    }
    const hashedPassword = hashPassword(password);
    const newUser = new SignupModel({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error('Error in user signup:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Helper functions
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken(userId) {
  const token = jwt.sign({ userId }, 'your_secret_key', {
    expiresIn: '1h',
  });
  return token;
}

// Database connection
mongoose
  .connect(
    'mongodb+srv://shivavarmak:shiva123@moto-riders.guadwwt.mongodb.net/Moto-Riders?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Database is connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error.message);
  });
