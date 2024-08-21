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
    if (this.isModified("password") || this.isNew ) {
        
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    const password = update.$set ? update.$set.password : undefined;
    
    if (password) {
        console.log(`in first if layer update.password: ${password}`)
        try {
            const userId = this.getQuery()._id;
            const existingUser = await this.model.findById(userId);
            console.log(`${existingUser.username}`);

            if (existingUser) {
                const isSamePassword = await bcrypt.compare(password, existingUser.password);
                console.log(`${isSamePassword} ${password}`)
                if (isSamePassword) {
                    const error = new Error("New password must be different from the current password.");
                    return next(error); // Stop the save operation
                }
            }

            // Proceed to hash the new password
            const saltRounds = 10;
            update.$set.password = await bcrypt.hash(password, saltRounds);
            this.setUpdate(update); // Ensure the hashed password is set in the update
        } catch (err) {
            return next(err);
        }
    }
    next();
});



// userSchema.pre("save", async function (next) {
//     if (this.isNew || this.isModified("password")) {
//         try {
//             // Only check for same password if the document is not new
//             if (!this.isNew) {
//                 const existingUser = await this.constructor.findById(this._id);
                
//                 if (existingUser) {
//                     const isSamePassword = await bcrypt.compare(this.password, existingUser.password);
//                     console.log(`${isSamePassword} password: ${this.password}`)
//                     if (isSamePassword) {
//                         const error = new Error("New password must be different from the current password.");
//                         return next(error); // Stop the save operation
//                     }
//                 }
//             }

//             // Proceed to hash the new password
//             const saltRounds = 10;
//             this.password = await bcrypt.hash(this.password, saltRounds);
//         } catch (err) {
//             return next(err);
//         }
//     }
// });

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