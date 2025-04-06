const express = require('express');
const path = require('path');
const Request = require('../models/Request'); // Correct model import
const router = express.Router();

// GET: Serve the Request page
router.get('/Request', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'Request.html'));
});

// POST: Handle book request form submission
router.post('/Request', async (req, res) => {
    try {
        const { Student_name, Student_id, Sem, Book_name } = req.body;

        const newRequest = new Request({
            Student_name,
            Student_id,
            Sem,
            Book_name
        });

        await newRequest.save();
        console.log("Book issued successfully");

        // Redirect to home page after success
        res.sendFile(path.join(__dirname, '..', 'public', 'Home.html'));
    } catch (error) {
        console.error("Error saving data:", error.message);
        res.status(500).send("An error occurred while processing your request.");
    }
});

module.exports = router;
