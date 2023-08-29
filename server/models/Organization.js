const {Schema, model} = require('mongoose');
const User = require('./User');
const Radio = require('./Radio')

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

orgSchema.statics.updateUsersOrg = async function (oldOrgName, newOrgName) {
    if (oldOrgName !== newOrgName) {

        try {
            const result = await User.updateMany({ orgName: oldOrgName }, { $set: { orgName: newOrgName } });

            console.log(`${result.nModified} users' orgNames updated.`);

        } catch (error) {

            console.error(`Organization Model - updateUserOrg error: ${error}`);

            throw new Error(`Failed to update users' organizations: ${error.message}`);
        }
    }
};

orgSchema.statics.updatesRadiosOrg = async function (oldOrgName, newOrgName) {
    if (oldOrgName !== newOrgName) {
        
        try {
            const result = await Radio.updateMany({ orgName: oldOrgName}, { $set: { orgName: newOrgName}});

            console.log(`${result.nModified} radios' orgNames updated.`);
        } catch (error) {

            console.error(`Organization Model - updateRadioOrg error: ${error}`);

            throw new Error(`Failed to update radio's organizations: ${error.message}`);
        }
    }
}


const Organization = model("Organization", orgSchema);

module.exports = Organization;