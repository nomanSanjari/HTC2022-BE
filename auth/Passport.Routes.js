require('dotenv').config();

const { request, response } = require('express');
const express = require('express');
const app = express();
const router = express.Router();

const passport = require('passport');
const Attribute = require('../models/Attribute.Model');
const User = require('../models/User.Model');

router.get('/api/auth/google/login', 
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: ['consent']
    }, async (req, res) => {
        response.sendStatus(200);
        response.end();
    })
);

router.get('/api/auth/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: '/api/auth/google/login/'
    }), async (req, res) => {
        
        User.findById(req.session.passport['user']).then((currentUser) => {
            if(currentUser.initialized === false) {
                res.redirect('/');
            }
            else {
                // go to main view
            }
        })
    }
);

router.get('/api/auth/google/logout', (req, res) => {
    request.logout((err) => {
        response.redirect('/');
    });
    
});

module.exports = router;