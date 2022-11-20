require('dotenv').config();

const passport = require('passport');

// configuring our Google OAuth 2 authentication strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// User model
const User = require('../models/User.Model');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, email, callback) => {

            // check if User exists -> using Google ID
            await User.findOne({ googleID: email.id }).then((currentUser) => {

                // if User exists
                if (currentUser) {
                    console.log(`User found: ${currentUser}`);
                }
                
                // if User does not exist
                else {
                    new User({
                        givenName: email.name.givenName,
                        familyName: email.name.familyName,
                        email: email.emails[0].value,
                        googleID: email.id
                    })
                    .save().then((newUser) => {
                        console.log(`New user saved: ${newUser}`);
                    });
                }
            });

        }
    )
);