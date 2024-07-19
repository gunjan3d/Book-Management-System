import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, MongodbUrl } from './config.js';
import bookroutes from './routes/bookroutes.js';

const app = express();

// Enable CORS for the frontend
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to match your frontend URL and port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/', (req, res) => {
    return res.status(200).send('Server is alive');
});

app.use('/books', bookroutes);

mongoose.connect(MongodbUrl)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to database:', error);
    });
