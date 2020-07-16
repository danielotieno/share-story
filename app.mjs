import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';

// Load Global configs
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.listen();

const PORT = process.env.PORT;
console.log(PORT);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
