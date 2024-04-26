const mongoose = require("mongoose");

// Define database URIs for different environments
const developmentMongoDBURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}/${process.env.DB_NAME}`;
const productionMongoDBURI = process.env.MONGODB_URI; // Set this in your Railway environment variables

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