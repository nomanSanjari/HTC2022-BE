require('dotenv').config();

// IMPORTS -> FRAMEWORK
const express = require('express');
const app = express();

// IMPORTS -> AUTHENTICATION
const passportSetupGoogle = require('./auth/passport-google.Setup');

// IMPORTS -> DATABASE
const mongoose = require('mongoose');

// IMPORTS -> SESSION
const expressSession = require('express-session');
const cookieSession = require('cookie-session');

// IMPORTS -> DATA HANDLING
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// IMPORTS -> ROUTES
const authenticationRoutes = require('./auth/passport-google.Routes');
const passport = require('passport');


// MIDDLEWARE -> UTILITIES

// so we can use json to send data back and forth
app.use(express.json());

// so we can encode data in the url
app.use(bodyParser.urlencoded({extended: false}));

// enable resource sharing
app.use(cors({origin: true, credentials: true}));

// MIDDLEWARE -> ROUTES
app.use(authenticationRoutes);

// Async function to connect to MongoDB
const db_Connect = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DB Connected!");
    }
    catch(error) {
        console.log(error);
    }
}

// Connect DB
db_Connect();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on PORT -> ${process.env.PORT}`);
});