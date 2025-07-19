// server/server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from './config/config.js';
import tasks from "./routes/task.routes.js";
import auth from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', tasks);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.send('Server is running');
});

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb.uri, config.mongodb.db);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.log('MongoDB connection error: ', error);
    }
}

const startServer = async () => {
    await connectDB();
    app.listen(config.port, '0.0.0.0', () => {
        console.log(`Server started on port ${config.port}. Press Ctrl-C to finish`);
    })
}

startServer();

