const {Schema, model} = require('mongoose');

const orgSchema = new Schema({
    orgName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    // radios: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Radio',
    // }],
    locations: [{
        type: Schema.Types.ObjectId,
        ref: 'Location'
    }],
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
});

orgSchema.statics.updateUsersOrg = async function (oldOrgName, newOrgName) {
    if (oldOrgName !== newOrgName) {

        try {

            const User = require('./User');


            const result = await User.updateMany({ orgName: oldOrgName }, { $set: { orgName: newOrgName } });

            if (result.modifiedCount > 0) {
                console.log(`${result.modifiedCount} users' orgNames updated.`);
            } else {
                console.log(`No users' orgNames were updated.`);
            }

        } catch (error) {

            console.error(`Organization Model - updateUserOrg error: ${error}`);

            throw new Error(`Failed to update users' organizations: ${error.message}`);
        }
    }
};

orgSchema.statics.updateRadiosOrg = async function (oldOrgName, newOrgName) {
    if (oldOrgName !== newOrgName) {
        
        try {

            const Radio = require('./Radio')

            const result = await Radio.updateMany({ orgName: oldOrgName}, { $set: { orgName: newOrgName}});

            if (result.modifiedCount > 0) {
                console.log(`${result.modifiedCount} radios' orgNames updated.`);
            } else {
                console.log(`No radios' orgNames were updated.`);
            }

        } catch (error) {

            console.error(`Organization Model - updateRadioOrg error: ${error}`);

            throw new Error(`Failed to update radio's organizations: ${error.message}`);
        }
    }
};

orgSchema.statics.updateLocationOrg = async function (oldOrgName, newOrgName) {
    if (oldOrgName !== newOrgName) {
        
        try {

            const Location = require('./Location')

            const result = await Location.updateMany({ orgName: oldOrgName}, { $set: { orgName: newOrgName}});

            if (result.modifiedCount > 0) {
                console.log(`${result.modifiedCount} locations' orgNames updated.`);
            } else {
                console.log(`No locations' orgNames were updated.`);
            }

        } catch (error) {

            console.error(`Organization Model - updateLocationOrg error: ${error}`);

            throw new Error(`Failed to update location's organizations: ${error.message}`);
        }
    }
};

const Organization = model("Organization", orgSchema);

module.exports = Organization;