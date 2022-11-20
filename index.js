require('dotenv').config();

const express = require('express');
const app = express();
const passport = require('passport');
const passportSetupGoogle = require('./auth/Passport.Setup');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authnRoutes = require('./auth/Passport.Routes');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(
    expressSession({
        secret: "amar nunu choto",
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://nomanSanjari:12345678ftw@cluster0.ptvyphi.mongodb.net/App?retryWrites=true&w=majority'
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

app.use(authnRoutes);

// Async function to connect to MongoDB
const db_Connect = () => {
    try {
        mongoose.connect('mongodb+srv://nomanSanjari:12345678ftw@cluster0.ptvyphi.mongodb.net/App?retryWrites=true&w=majority');
        console.log("DB Connected!");
    }
    catch (error) {
        console.log(error);
    }
}

// Connect DB
db_Connect();

app.listen(8000, () => {
    console.log('Server running on PORT -> 8000');
});

app.get('/', (request, response) => {
    response.send(request.session.id);
})