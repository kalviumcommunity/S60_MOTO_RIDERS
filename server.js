const express = require( 'express' );
const mongoose = require('mongoose');
const app = express()


app.get('/ping', (req, res) => {
    res.send('pong')
})


 
app.listen(4050, ()=>{
    console.log('Surver is running')
})
