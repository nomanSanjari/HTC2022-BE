const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// defining the User schema
const userSchema = new Schema({
    givenName: {
        type: String,
        require: true
    },
    familyName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    googleID: {
        type: String,
        require: true
    }
});

// using the userSchema to define the User model
const User = mongoose.model('users', userSchema);

// exporting the User model
module.exports = User;