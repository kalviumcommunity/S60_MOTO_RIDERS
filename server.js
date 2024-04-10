const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 4050;
const route = require('./routes');
app.use('/', route);

mongoose
  .connect(
    'mongodb+srv://shivavarmak:shiva123@moto-riders.guadwwt.mongodb.net/?retryWrites=true&w=majority&appName=Moto-Riders',
    { useNewUrlParser: true, useUnifiedTopology: true }
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

app.get('/ping', (req, res) => {
  res.send('pong');
});
