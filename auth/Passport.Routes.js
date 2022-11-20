require('dotenv').config();

const { request, response } = require('express');
const express = require('express');
const router = express.Router();

const passport = require('passport');

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

            if (currentUser) {
                res.status(200).json({
                    'message': 'User found',
                    'ID': currentUser.id
                })
            }
            else {
                console.log(req);
            }
        })
    }
)


router.get('/api/auth/google/logout', (req, res) => {
    request.logout((err) => {
        response.redirect('/');
    });

});

module.exports = router;