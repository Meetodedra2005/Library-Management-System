// routes/request.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const Request = require('../models/Request');
const router = express.Router();

// Serve the Request page
router.get('/Request', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'Request.html'));
});

// Handle POST request
router.post('/Request', async (req, res) => {
    try {
        const { Student_name, Student_id, Sem, Book_name } = req.body;

        // Load book data from JSON
        const bookDataPath = path.join(__dirname, '..', 'public', 'books', 'dept_lib_new.json');
        const rawData = fs.readFileSync(bookDataPath);
        const books = JSON.parse(rawData);

        // Find the selected book
        const selectedBook = books.find(book => book.Name === Book_name);

        // If book not found, send error
        if (!selectedBook) {
            return res.status(404).send("Book not found.");
        }

        // Convert availability to boolean (JSON has "True" or "False" as string)
        const isAvailable = selectedBook.Available.toLowerCase() === 'true';

        // Save to DB
        const newRequest = new Request({
            Student_name,
            Student_id,
            Sem,
            Book_name,
            Available: isAvailable
        });

        await newRequest.save();
        console.log("Book request saved successfully");

        res.sendFile(path.join(__dirname, '..', 'public', 'Home.html'));
    } catch (error) {
        console.error("Error saving request:", error.message);
        res.status(500).send("An error occurred while processing your request.");
    }
});

module.exports = router;
