require('dotenv').config();

const express = require('express');
const router = express.Router();

const passport = require('passport');

// ROUTES -> AUTHENTICATION

// COMPLETE
// ROUTE -> GOOGLE LOGIN -> AUTHENTICATION

/*
NOTES FOR ME
* access_type = offline -> service returns a refresh token
* prompt = consent -> service returns a refresh token everytime
* prompt = select_account -> service allows user to select account to log in with 
*/

router.get('/api/auth/google/login', 
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: ['consent']
    }, async (request, response) => {
        response.sendStatus(200);
        response.end();
    })
);

/* 
NOTES FOR ME
* this is where the authentication cycle ends
*/
// COMPLETE
// ROUTE -> GOOGLE LOGIN -> CALLBACK
router.get('/api/auth/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: '/api/auth/google/login/failure'
    }), async (request, response) => {
        response.status(200);
        response.write("Successfully logged in!");
        response.write(request.session.id);
        response.send();
    }
);

// COMPLETE
// ROUTE -> GOOGLE LOGIN -> LOGIN FAILURE
router.get('/api/auth/google/login/failure', (request, response) => {
    response.status(400);
    response.redirect('/api/auth/google/login');
    response.end();
});

// COMPLETE
// ROUTE -> GOOGLE LOGOUT 
router.get('/api/auth/google/logout', (request, response) => {
    request.logout((err) => {
        response.redirect('/');
    });
    
});

// export the router object
module.exports = router;