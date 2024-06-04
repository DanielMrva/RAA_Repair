if (process.env.NODE_ENV == 'production') {
    require('dotenv').config({path: '.env.production'});
} else {
    require ('dotenv').config({path: '.env.development'});
}
const mongoose = require("mongoose");

const developmentMongoDBURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}/${process.env.DB_NAME}`;

// const developmentMongoDBURI = `mongodb://127.0.0.1:27017/radio_referbish_DB`;
const productionMongoDBURI = process.env.MONGODB_URI;

// Function to determine which URI to use
function getDatabaseUri() {
    if (process.env.NODE_ENV === 'production') {
        return productionMongoDBURI;
    } else {
        return developmentMongoDBURI;
    }
}

// Connect to the appropriate MongoDB URI
mongoose.connect(getDatabaseUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.log('MongoDB connection error:', err));

module.exports = mongoose.connection;