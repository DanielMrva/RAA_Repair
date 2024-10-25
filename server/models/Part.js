const { Schema, model } = require ('mongoose');

const partSchema = new Schema({
    partNumber: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    data: {
        type: String,
        trim: true
    },
    manufacturer: {
        type: String,
        trim: true
    },
    cost: [{
        type: Number
    }],
    msrp: {
        type: Number
    }

})

const Part = model("Part", partSchema);

module.exports = Part;