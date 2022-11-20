require('dotenv').config();

const express = require('express');
const app = express();
const passport = require('passport');
const passportSetupGoogle = require('./auth/passport-google.Setup');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const expressSession = require('express-session');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authenticationRoutes = require('./auth/passport-google.Routes');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(
    expressSession({
        secret: "amar nunu choto",
        store: MongoStore.create({
            mongoUrl: process.env.DATABASE_URL
        }),
        resave: false,
        saveUnitialized: true,
        cookie: {
            maxAge: 1 * 60 * 60 * 1000,
            secure: false // since we don't have an SSL cert...yet
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authenticationRoutes);

// Async function to connect to MongoDB
const db_Connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("DB Connected!");
    }
    catch (error) {
        console.log(error);
    }
}

// Connect DB
db_Connect();

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on PORT -> ${process.env.PORT}`);
});

app.get('/', (request, response) => {
    response.send(request.session.id);
})