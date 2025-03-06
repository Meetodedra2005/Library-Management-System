// const express = require('express');
// const path = require('path');
// const Book_issue = require('../models/Book_issue'); // Ensure correct import
// const router = express.Router();

// router.get('/adminlogin', async (req, res) => {
//     try {
//         const data = await Book_issue.find(); // Fetch all book issue requests
//         res.render("adminlogin", { records: data }); // Pass data to template
//     } catch (err) {
//         console.error("Error fetching data:", err);
//         res.status(500).send("Error fetching data");
//     }
// });

// module.exports = router;

const express = require('express');
const path = require('path');
const Book_issue = require('../models/Book_issue'); // Ensure correct import
const router = express.Router();

router.get('/adminlogin', async (req, res) => {
    try {
        const data = await Book_issue.find(); // Fetch all book issue requests
        res.sendFile(path.join(__dirname, '..', 'public', 'adminlogin.html'));
    } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
    }
});

router.get('/fetch-requests', async (req, res) => {
    try {
        const data = await Book_issue.find(); // Fetch all book requests
        res.json(data);
    } catch (err) {
        console.error("Error fetching book requests:", err);
        res.status(500).json({ error: "Failed to fetch book requests" });
    }
});

module.exports = router;
