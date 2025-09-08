const mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb is connected sucessfully")
    } catch (e) {
        console.error("MongoDB connection failed.")
        process.exit(1);
    }
}

module.exports = connectToDB;