import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import urlRoutes from './routes/urls.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000
const MONGO_URI = process.env.MONGO_URI; // Use MONGO_URI from .env

app.use(bodyParser.json());


mongoose
  .connect('mongodb://127.0.0.1:27017/urlshortner', {
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

app.use('/', urlRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
