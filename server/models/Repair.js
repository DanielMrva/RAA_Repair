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
    radioOrg: {
        type: String
    },
    radioLocation: {
        type: String
    },
    reportedBy: {
        type: String
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
    repairStatus: {
        type: String,
    },
    dateRepairAdded: {
        type: Date,
        // default: Date.now
    },
    dateSentEuRaa: {
        type: Date,
        // default: Date.now
        // NOTE: All of these dates flow From --> To, regardless if they are sent or rec.
    },
    dateRecEuRaa: {
        type: Date,
        // default: Date.now
        // Legacy: dateReceived
    },
    dateSentRaaTech: {
        type: Date,
        // default: Date.now,
        // Legacy: dateSentTech
        // get: (timestamp) => dateFormat(timestamp),
        // Admin
    },
    dateRecTechRaa: {
        type: Date,
        // default: Date.now,
        // Legacy: dateRecTech
        // get: (timestamp) => dateFormat(timestamp),
        // Tech
    },
    dateSentRaaEu: {
        type: Date,
        // default: Date.now,
        // Legacy: dateSentEU
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

repairSchema.pre('findOneAndDelete', async function (next) {
    const repair = await this.model.findOne(this.getQuery());
    if (repair && repair.radioID) {
        const Radio = require('./Radio');

        await Radio.findByIdAndUpdate(repair.radioID, {
            $pull: { serviceRecord: repair._id }
        });
    }
    next();
});



const Repair = model("Repair", repairSchema);



module.exports = Repair;

// pointOfContact: {
//     type: String
// }
// TODO: Add in a field for who reported the issue POINT OF CONTACT

