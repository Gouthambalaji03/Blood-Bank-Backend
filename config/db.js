const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        // Mongoose 9.x - no deprecated options needed
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDB ${conn.connection.host}`.bgCyan.white);

        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.log(`MongoDB connection error: ${err}`.bgRed.white);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected'.bgYellow.black);
        });

    } catch (err) {
        console.log(`MongoDB database error: ${err}`.bgRed.white);
        process.exit(1);
    }
};

module.exports = connectDB;
