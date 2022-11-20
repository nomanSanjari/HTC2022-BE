require('dotenv').config();

const passport = require('passport');

// configuring our Google OAuth 2 authentication strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback'
        },
        (accessToken, refreshToken, profile, email, callback) => {
            console.log("Callback function fired");
            console.log(email);
            console.log("----BREAK----");
            console.log(profile);
        }
    )
);