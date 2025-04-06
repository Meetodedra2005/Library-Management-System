const express = require('express');
const path = require('path');
const Request = require('../models/Request'); // ✅ Correct model name

const router = express.Router();

// Admin login page
router.get('/adminlogin', async (req, res) => {
    try {
        const data = await Request.find(); // ✅ Now this will work
        res.sendFile(path.join(__dirname, '..', 'public', 'adminlogin.html'));
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
    }
});

// Fetch requests (AJAX or frontend fetch call)
router.get('/fetch-requests', async (req, res) => {
    try {
        const data = await Request.find(); // ✅ Works now
        res.json(data);
    } catch (err) {
        console.error("Error fetching book requests:", err);
        res.status(500).json({ error: "Failed to fetch book requests" });
    }
});

module.exports = router;
