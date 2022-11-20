const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attributesSchema = new Schema({
    userID: {
        type: String,
        require: true
    },
    // gender
    gender: {
        type: String,
        require: true
    },
    // in centimetres
    height: {
        type: Number,
        require: true
    },
    // in kilograms
    weight: {
        type: Number,
        require: true
    },
    // in years
    age: {
        type: Number,
        require: true
    },
    activity: {
        type: Number,
        require: true
    }
});

const Attribute = mongoose.model('attributes', attributesSchema);

module.exports = Attribute;