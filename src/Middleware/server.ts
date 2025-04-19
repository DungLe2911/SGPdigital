import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;
const mongStr = 'mongodb://localhost:2107/';
app.use(express.json());

mongoose
    .connect(mongStr)
    .then(
        ()=>{console.log(`Successfully connect to ${mongStr}`)}, 
        err =>{console.error(`Error connecting to ${mongStr}: ${err}`)})


app.get('/', (req, res) => {
    res.send('Hello, ES6 + Express!');
});

// Start server
app

    .listen(PORT, () => {console.log(`Server running at http://localhost:${PORT}`)});
  