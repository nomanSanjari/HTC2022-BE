require('dotenv').config();

const passport = require('passport');

// configuring our Google OAuth 2 authentication strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// User model
const User = require('../models/User.Model');

// serializer for users
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// deserializer for users
// async await here due to database call
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(null, user);
    });
});

// Google Strategy set up for authentication
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
            passReqToCallback: true
        },
        async (accessToken, refreshToken, profile, email, done) => {

            // check if User exists -> using Google ID
            await User.findOne({ googleID: email.id }).then((currentUser) => {

                // if User exists
                if (currentUser) {
                    console.log(`User found: ${currentUser}`);

                    // serialize user
                    done(null, currentUser);
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

                            // serialize user
                            done(null, newUser);
                        });
                }
            });

        }
    )
);