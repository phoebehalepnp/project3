import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bookRouter from './routes/bookRouter.js';

dotenv.config();  // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/books', bookRouter);

// Connect to MongoDB
// const URI = process.env.ATLAS_URI;
// const URI = 'mongodb://localhost:27017/mern-books';
const URI = "mongodb+srv://jul241:123@cluster0.f9d6o.gcp.mongodb.net/Jul24books";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your Express server once connected to MongoDB
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
