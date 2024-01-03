const { Schema, model } = require('mongoose');
const Radio = require('./Radio');

const locationSchema = new Schema({
    locationName: {
        type: String,
        required: true,
        // unique: true,
        trim: true
    },
    orgName: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    zip: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    contactEmail: {
        type: String,
        trim: true
    },
    primaryContact: {
        type: String,
        trim: true
    },
    radios: [{
        type: Schema.Types.ObjectId,
        ref: 'Radio'
    }]

});

const Location = model("Location", locationSchema);

module.exports = Location;
