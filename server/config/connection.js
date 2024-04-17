const mongoose = require("mongoose");

// const developmentMongoDBURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}/${process.env.DB_NAME}`;

const prodURI ="mongodb://mongo:GeAjiOoLyIXRIiRqlgSvMhvXWMMzsNDF@viaduct.proxy.rlwy.net:31288"

mongoose.connect(
    // process.env.MONGODB_URI || developmentMongoDBURI,
    process.env.MONGODB_URI
);

module.exports = mongoose.connection;