const { Schema, model } = require ('mongoose');

const associationSchema = new Schema({
    associationName: {
        type: String,
        required: true,
        trim: true
    },
    aType: {
        type: String,
        trim: true
    }

});

const Association = model("Association", associationSchema);

model.exports = Association;