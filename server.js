const express = require( 'express' );
const mongoose = require('mongoose');
const app = express()


mongoose.connect('mongodb+srv://shivavarmak:shiva123@moto-riders.guadwwt.mongodb.net/?retryWrites=true&w=majority&appName=Moto-Riders')

.then(
    ()=> console.log('DB Connected')
).catch(err => console.log(err))

app.get('/ping', (req, res) => {
    res.send('pong')
})


 
app.listen(4050, ()=>{
    console.log('Surver is running')
})
