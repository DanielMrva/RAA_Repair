const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Organization = require('./Organization');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //TODO: put in some sort of validation
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    accessLevel: {
        type: String,
        // required: true,
    },
    orgName: {
        type: String,
        required: true,
    },
    userLocation: {
        type: String
    }
});

userSchema.pre("save", async function (next)  {
    if (this.isNew || this.isModified("password")) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.post("save", async function (next)  {
    await Organization.findOneAndUpdate({orgName: this.orgName}, {$addToSet: {users: this._id}})
});

userSchema.statics.updateOrganization = async function (_id, newOrgName) {
    try {
        const user = await this.findById(_id);

        if (!user) {
            throw new Error('User Not Found');
        }

        const oldOrgName = user.orgName;

        if (oldOrgName !== newOrgName) {
            console.log(`update: ${oldOrgName} to ${newOrgName}`)
            await Organization.findOneAndUpdate(
                {orgName: oldOrgName},
                { $pull: { users: _id} }
            )

            await Organization.findOneAndUpdate(
                { orgName: newOrgName},
                { $addToSet: { users: _id} }
            )

            user.orgName = newOrgName;
            await user.save();
        }
    } catch (error) {
        console.log(`User Model - updateOrganization error: ${error}`);
        throw new Error (`Failed to update user organization ${error.message}`)
    }
};

const User = model("User", userSchema);

module.exports = User;