const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const homeRoutes = require('./home');
const requestRoutes = require('./request');

const app = express();

// Middleware setup
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.json()); // Replacing body-parser.json()

// Use routes from home.js and request.js
app.use(homeRoutes);
app.use(requestRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Library_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Database connected to Library management'))
    .catch(err => console.log('Database connection error: ', err));

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
