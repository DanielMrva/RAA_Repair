const { Schema, model } = require("mongoose");
// const dateFormat = require("../utils/dateFormat")
const Location = require('./Location');

const radioSchema = new Schema({
    orgName: {
        type: String,
        required: true,
    },
    locationName: {
        type: String
    },
    dateSold: {
        type: Date,
        default: Date.now,
        // get: (timestamp) => dateFormat(timestamp),
    },
    dateEntered: {
        type: Date,
        default: Date.now,
        // get: (timestamp) => dateFormat(timestamp),
    },
    inventoryNumber: {
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
        // How many channels is this radio programed for? Number between 1 - 16
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
        // get: (timestamp) => dateFormat(timestamp),
        //TODO: Change to warranty term, warranty exp date?
    },
    refurb: {
        type: Boolean,
        default: false,
    },
    radioType: {
        type: String,
        // Mobile, Base Station, Hand-Held
        // TODO: Research Union types or Enums type?...
    }
});

radioSchema.statics.updateLocation = async function (_id, newLocationName) {
    try {
        const radio = await this.findById(_id);

        if (!radio) {
            throw new Error('Radio Not Found');
        }

        const oldLocationName = radio.locationName;

        if (oldLocationName !== newLocationName) {
            console.log(`update: ${oldLocationName} to ${newLocationName}`);
            await Location.findOneAndUpdate(
                {locationName: oldLocationName},
                { $pull: { radios: _id } }
            )

            await Location.findOneAndUpdate(
                { locationName: newLocationName},
                { $addToSet: { radios: _id } }
            )

            radio.locationName = newLocationName;
            await radio.save();
        }
    } catch (error) {
        console.log(`Radio Model - updateLocation error: ${error}`);
        throw new Error (`Failed to update radio location ${error.message}`)
    }
}

const Radio = model("Radio", radioSchema);

module.exports = Radio;