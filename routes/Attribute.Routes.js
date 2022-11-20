const router = require('express').Router()

const User = require('../models/User.Model');
const Attribute = require('../models/Attribute.Model');

router.put('/attribute/initialize', (req, res) => {
    User.findById(req.session.passport['user']).then((currentUser) => {
        currentUser.initialized = true
        currentUser.save()

        new Attribute({
            userID: req.session.passport['user'],
            gender: req.body.gender,
            height: req.body.height,
            weight: req.body.weight,
            age: req.body.age,
            activity: req.body.activity
        }).save().then((newAttribute) => {
            res.redirect('/attribute/calculate')
        })
    })
})

router.put('/attribute/calculate', (req, res) => {

    let currentUser = User.findById(req.session.passport['user'])
    let currentAttribute = Attribute.findOne({'userID' : currentUser.id})

    let BMR = 0;

    if (currentAttribute.gender === male) {
        BMR = 66 + (13.7 * currentAttribute.weight) + (5 * currentAttribute.height) - (6.8 * currentAttribute.age)
    }
    else {
        BMR = 655 + (9.6 * currentAttribute.weight) + (1.8 * currentAttribute.height) - (4.7 * currentAttribute.age)
    }

    if (currentAttribute.activity === 0) { BMR = BMR * 1.2 }
    if (currentAttribute.activity === 1) { BMR = BMR * 1.375 }
    if (currentAttribute.activity === 2) { BKR = BMR * 1.55 }
    if (currentAttribute.activity === 3) { BMR = BMR * 1.725 }
    if (currentAttribute.activity === 4) { BMR = BMR * 1.9 }

    currentUser.BMR = BMR;
    currentUser.save()

})

module.exports = router;