require('dotenv').config();

const { initialize } = require('passport');
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User.Model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: '501847168077-fl9m5blp8dkst9pju3j6cosdugd27ovh.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: '/api/auth/google/callback',
            passReqToCallback: true
        },
        async (accessToken, refreshToken, profile, email, done) => {

            await User.findOne({ googleID: email.id }).then((currentUser) => {

                if (currentUser) {
                    console.log(`User found: ${currentUser}`);

                    done(null, currentUser);
                }

                else {
                    new User({
                        givenName: email.name.givenName,
                        familyName: email.name.familyName,
                        email: email.emails[0].value,
                        googleID: email.id,
                        initialized: false,
                        BMR: 0
                    }).save().then((newUser) => {
                        console.log(`New user saved: ${newUser}`);
                        done(null, newUser);
                    });
                }
            });

        }
    )
);