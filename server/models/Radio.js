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

radioSchema.statics.updateLocationAndOrganization = async function (_id, updatedOrgName, updatedLocationName) {

    try {
        const radio = await this.findById(_id);

        if (!radio) {
            throw new Error(`Radio ${_id} not found`)
        }

        const oldLocationName = radio.locationName;
        const oldOrgName = radio.orgName;

        // Step 1: Cleanup of any potential misplaced radio assignments
        console.log(`Cleaning up misplaced radio assignments for radio ID: ${_id}`);
        await Location.updateMany(
            { radios: _id, $or: [{ locationName: { $ne: oldLocationName } }, { orgName: { $ne: oldOrgName } }] },
            { $pull: { radios: _id } }
        );


        // Step 2: Check if changes are neccessary
        const orgChanged = updatedOrgName && updatedOrgName !== oldOrgName;
        const locationChanged = updatedLocationName && updatedLocationName !== oldLocationName;

        if (!orgChanged && !locationChanged) {
            console.log(`No changes to orgName or locationName for ${_id}`);
            return
        }

        // Step 3: Add the radio to the new location
        const targetLocation = await Location.findOneAndUpdate(
            { locationName: updatedLocationName, orgName: updatedOrgName || oldOrgName },
            { $addToSet: { radios: _id } },
            { new: true }
        );

        if (!targetLocation) {
            throw new Error(`Target location ${updatedLocationName} for organization ${updatedOrgName} does not exist.`);
        }

        console.log(`Radio ${_id} added to ${updatedOrgName || oldOrgName} - ${updatedLocationName}`);

        // Step 4: Update the old location if necessary
        if (orgChanged || locationChanged) {
            await Location.updateOne(
                { locationName: oldLocationName, orgName: oldOrgName },
                { $pull: { radios: _id } }
            );
            console.log(`Radio ${_id} removed from ${oldOrgName} - ${oldLocationName}`);
        }

        // Step 5: Update the radio document
        radio.locationName = updatedLocationName;
        if (orgChanged) {
            radio.orgName = updatedOrgName;
        }
        await radio.save();

        console.log(`Radio ${_id} updated: locationName -> ${updatedLocationName}, orgName -> ${updatedOrgName || oldOrgName}`);

    } catch (error) {
        console.error(`Failed to update radio location and organization: ${error.message}`);
        throw new Error(`Failed to update radio: ${error.message}`);
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