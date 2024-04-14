const { Schema, model } = require("mongoose");
// const dateFormat = require("../utils/dateFormat");



const repairSchema = new Schema({
    radioID: {
        type: String,
        // required: true
    },
    radioMake: {
        type: String,
    },
    radioSerial: {
        type: String
    },
    radioLocation: {
        type: String
    },
    dateReceived: {
        type: Date,
        default: Date.now,
        // get: (timestamp) => dateFormat(timestamp),
        // Admin
    }, 
    endUserPO: {
        type: String,
        // Admin
    },
    raaPO: {
        type: String,
        // Admin
    },
    repairTag: {
        type: Number,
    },
    dateSentTech: {
        type: Date,
        default: Date.now,
        // get: (timestamp) => dateFormat(timestamp),
        // Admin
    },
    dateRecTech: {
        type: Date,
        default: Date.now,
        // get: (timestamp) => dateFormat(timestamp),
        // Tech
    },
    dateSentEU: {
        type: Date,
        default: Date.now,
        // get: (timestamp) => dateFormat(timestamp),
        // Admin
    },
    techInvNum: {
        type: String,
        // Tech
    },
    raaInvNum: {
        type: String,
        // Admin
    },
    symptoms: [{
        type: String,
        // User
    }],
    testFreq: {
        type: String,
        // MHZ (MegaHertz)
        // Tech / Admin
    },
    incRxSens: {
        type: String,
        // uV ()
        // Tech / Admin
    },
    incFreqErr: {
        type: String,
        // Hz,
        // Tech / Admin

    },
    incMod: {
        type: String,
        // KHz
        // Tech / Admin

    },
    incPowerOut: {
        type: String,
        // Watts
        // Tech / Admin

    },
    outRxSens: {
        type: String,
        // uV
        // Tech / Admin

    },
    outFreqErr: {
        type: String,
        // Hz
        // Tech / Admin

    },
    outMod: {
        type: String,
        // KHz
        // Tech / Admin

    },
    outPowerOut: {
        type: String,
        // Watts
        // Tech / Admin

    },
    accessories: [{
        type: String,
        // User / Tech / Admin
    }],
    workPerformed: [{
        type: String,
        // Tech / Admin
    }],
    repHours: {
        type: Number,
        // Tech / Admin
    },
    partsUsed: [{
        type: String,
        // TODO: later pulled from parts table
        // Tech / Admin
    }],
    remarks: {
        type: String,
        // Tech / Admin
    },

});



const Repair = model("Repair", repairSchema);



module.exports = Repair;

    // pointOfContact: {
    //     type: String
    // }
    // TODO: Add in a field for who reported the issue POINT OF CONTACT

