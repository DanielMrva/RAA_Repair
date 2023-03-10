const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat")

const radioSchema = new Schema({
    orgName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    dateSold: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    dateEntered: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    invoiceNumber: {
        type: String,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
    },
    progChannels: {
        type: String,
    },
    notes: [{
        type: String,
    }],
    serialNumber: {
        type: String,
        required: true,
    },
    serviceRecord: [{
        type: Schema.Types.ObjectId,
        ref: "Repair"
    }],
    warranty: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
        //TODO: Change to warranty term, warranty exp date?
    },
    refurb: {
        type: Boolean,
        default: false,
    },
    radioType: {
        type: String,
        // TODO: Research Union types or Enums type?...
    }
});

const Radio = model("Radio", radioSchema);

module.exports = Radio;