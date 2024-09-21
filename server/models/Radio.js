const { Schema, model } = require("mongoose");
// const dateFormat = require("../utils/dateFormat")
const Location = require('./Location');
const Repair = require('./Repair')

const radioSchema = new Schema({
    orgName: {
        type: String,
        required: true,
    },
    locationName: {
        type: String
    },
    datePurchased: {
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

            // Remove radio from old location
            await Location.findOneAndUpdate(
                { locationName: oldLocationName },
                { $pull: { radios: _id } }
            );

            // Check if the new location exists
            const newLocation = await Location.findOne({ locationName: newLocationName });

            if (!newLocation) {
                throw new Error(`Location '${newLocationName}' does not exist.`);
            }

            // Check if the new location already contains the radio._id
            if (!newLocation.radios.includes(_id)) {
                // Add radio to new location if not already present
                await Location.findOneAndUpdate(
                    { locationName: newLocationName },
                    { $addToSet: { radios: _id } }
                );
            } else {
                console.log(`Radio already exists in new location: ${newLocationName}`);
            }

            // Update the radio document with the new location
            radio.locationName = newLocationName;
            await radio.save();
        } else if (oldLocationName === newLocationName) {
            console.log(`Possible Self-Edit location: from ${oldLocationName} to ${newLocationName}`);

            // Check if the current location exists
            const currentLocation = await Location.findOne({ locationName: oldLocationName });

            if (!currentLocation) {
                throw new Error(`Location '${oldLocationName}' does not exist.`);
            }

            // Check if the current location already contains the radio._id
            if (!currentLocation.radios.includes(_id)) {
                // Add radio._id to the current location if not already present
                await Location.findOneAndUpdate(
                    { locationName: oldLocationName },
                    { $addToSet: { radios: _id } }
                );
            } else {
                console.log(`Radio already exists in location: ${oldLocationName}`);
            }
        }
    } catch (error) {
        console.log(`Radio Model - updateLocation error: ${error}`);
        throw new Error(`Failed to update radio location: ${error.message}`);
    }
};

radioSchema.statics.deleteByIdAndCleanupRepairs = async function (_id) {
    try {
        const radioToDelete = await this.findById(_id);

        if (!radioToDelete) {
            throw new Error('Radio not found');
        }

        // If there are any repairs associated with the radio, delete them
        if (radioToDelete.serviceRecord.length > 0) {
            await Repair.deleteMany({ _id: { $in: radioToDelete.serviceRecord } });
        }

        // Delete the radio
        const deletedRadio = await this.findByIdAndDelete(_id);
        return deletedRadio;
    } catch (error) {
        console.error(`Failed to delete radio and cleanup repairs: ${error}`);
        throw new Error(`Failed to delete radio and associated repairs: ${error.message}`);
    }
};

radioSchema.statics.updateRepairsWithNewRadioInfo = async function (_id, updates = {}) {
    try {
        const radio = await this.findById(_id);

        if (!radio) {
            throw new Error('Radio Not Found');
        }

        const { make: newMake, serialNumber: newSerialNumber } = updates;

        // Prepare update conditions for repairs
        const repairUpdates = {};

        if (newMake && radio.make !== newMake) {
            repairUpdates.radioMake = newMake;
        }

        if (newSerialNumber && radio.serialNumber !== newSerialNumber) {
            repairUpdates.radioSerial = newSerialNumber;
        }

        // Only proceed if there are changes to make or serial number
        if (Object.keys(repairUpdates).length > 0) {
            // Update all repairs associated with this radio via radioID
            const updateResult = await Repair.updateMany(
                { radioID: _id },
                { $set: repairUpdates }
            );

            if (updateResult.nModified === 0) {
                console.log('No repairs found or modified.');
            } else {
                console.log(`Updated ${updateResult.nModified} repairs`);
            }

            // Update the radio document with the new make and/or serial number
            if (newMake) {
                radio.make = newMake;
            }
            if (newSerialNumber) {
                radio.serialNumber = newSerialNumber;
            }

            await radio.save();

            return `Repairs updated and radio information saved. ${updateResult.nModified} repairs modified.`;
        } else {
            return 'No changes detected in radio make or serial number.';
        }
    } catch (error) {
        console.log(`Radio Model - updateRepairsWithNewRadioInfo error: ${error}`);
        throw new Error(`Failed to update radio and related repairs: ${error.message}`);
    }
};



const Radio = model("Radio", radioSchema);

module.exports = Radio;