const mongoose = require("mongoose");

const developmentMongoDBURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}/${process.env.DB_NAME}`;

mongoose.connect(
    process.env.MONGODB_URI || developmentMongoDBURI,
);

module.exports = mongoose.connection;