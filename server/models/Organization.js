const {Schema, model} = require('mongoose');
const userSchema = require('./User');

const orgSchema = new Schema({
    orgName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    radios: [{
        type: Schema.Types.ObjectId,
        ref: 'Radio',
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
});

const Organization = model("Organization", orgSchema);

module.exports = Organization;