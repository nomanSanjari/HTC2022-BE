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
    },
    initialized: {
        type: Boolean,
        require: true
    },
    BMR: {
        type: Number,
        require: true
    }
});

const User = mongoose.model('users', userSchema);

module.exports = User;