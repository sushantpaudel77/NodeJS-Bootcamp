const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/node-auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected successfully");
    } catch (e) {
        console.error("MongoDB connection failed.", e);
        process.exit(1);
    }
}

module.exports = connectToDB;
 