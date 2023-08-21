const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Organization = require("./Organization")

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


const User = model("User", userSchema);

module.exports = User;