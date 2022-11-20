const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// defining the Attributes schema
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

// using the characteristicsSchema to define the Characteristics model
const Attribute = mongoose.model('attributes', attributesSchema);

// exporting the Characteristic model
module.exports = Attribute;