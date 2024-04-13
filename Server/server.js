const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');
const route = require('./routes');

const app = express();
const PORT = 4050;

// Middleware
app.use(express.json());
app.use(cors());
// app.use('/', route);

// Routes
app.get('/getUsers', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
console.log('Here is testing console.');

app.post('/form', (req, res) => {
  console.log(req);
  UserModel.create(req.body)
    .then((Users) => res.json(Users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

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
