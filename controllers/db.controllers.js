require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const dbURI = process.env.MONGODB_URL;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});
