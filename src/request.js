const express = require('express');
const path = require('path');
const Book_issue = require('../models/Book_issue'); // Update path as per your structure
const router = express.Router();

// Route for the Request page
router.get('/Request', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'Request.html'));
});

// POST request to handle book request
router.post('/Request', async (req, res) => {
    try {
        const { Student_name, Student_id, Sem, Book_name } = req.body; // Use Sem with uppercase S if schema uses it

        const newUser = new Book_issue({
            Student_name,
            Student_id,
            Sem,
            Book_name,
        });

        await newUser.save();
        console.log("Book issued successfully");
        res.sendFile(path.join(__dirname, '..', 'public', 'Home.html'));
    } catch (error) {
        console.error("Error saving data:", error.message);
        res.status(500).send("An error occurred while processing your request.");
    }
});

module.exports = router;
