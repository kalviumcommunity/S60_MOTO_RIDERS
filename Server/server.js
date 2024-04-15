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

app.get('/getUsers/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  UserModel.findById(id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json('User not found'));
});



app.post('/form', (req, res) => {
  console.log(req);
  UserModel.create(req.body)
    .then((Users) => res.json(Users))
    .catch((err) => res.status(400).json('Error: ' + err));
});


app.put("/updateUser/:id",(req,res)=>{
  const id = req.params.id;
  UserModel.findByIdAndUpdate(id,req.body)
  .then(user => res.json(user))
  .catch(err => res.status(404).json('User not found'))
})

app.delete('/deleteUser/:id',(req, res)=>{
  const id = req.params.id;
  UserModel.findByIdAndDelete(id,req.body)
  .then(user => res.json(user))
  .catch(err => res.status(404).json('User not found'))
})


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
