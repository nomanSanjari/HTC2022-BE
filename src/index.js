require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

// default port to listen on
const PORT = 8000;

// so we can use json to send data back and forth
app.use(express.json());

// so we can encode data in the url too
app.use(bodyParser.urlencoded({extended: false}));

// home page -> /
app.get('/', async (request, response) => {
    response.send("Suh dude!");
    console.log("Traffic received!");
});

app.listen(PORT, () => {
    console.log(`Server running on PORT -> ${PORT}`);
});