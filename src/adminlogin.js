// const express = require('express');
// const path = require('path');
// const Request = require('../models/Request'); // ✅ Correct model name

// const router = express.Router();

// // Admin login page
// router.get('/adminlogin', async (req, res) => {
//     try {
//         const data = await Request.find(); // ✅ Now this will work
//         res.sendFile(path.join(__dirname, '..', 'public', 'adminlogin.html'));
//     } catch (err) {
//         console.error("Error fetching data:", err);
//         res.status(500).send("Error fetching data");
//     }
// });

// // Fetch requests (AJAX or frontend fetch call)
// router.get('/fetch-requests', async (req, res) => {
//     try {
//         const data = await Request.find(); // ✅ Works now
//         res.json(data);
//     } catch (err) {
//         console.error("Error fetching book requests:", err);
//         res.status(500).json({ error: "Failed to fetch book requests" });
//     }
// });

// module.exports = router;


// const express = require('express');
// const path = require('path');
// const Request = require('../models/Request');
// const BookIssue = require('../models/BookIssue');

// const router = express.Router();

// // Admin login page with both pending requests and issued books
// router.get('/adminlogin', async (req, res) => {
//     try {
//         const requests = await Request.find();         // Pending requests
//         const issuedBooks = await BookIssue.find();    // Issued book records
//         res.render('adminlogin', { requests, issuedBooks });
//     } catch (err) {
//         console.error("Error loading admin data:", err);
//         res.status(500).send("Error loading admin panel");
//     }
// });

// module.exports = router;

// const express = require('express');
// const path = require('path');
// const Request = require('../models/Request');
// const BookIssue = require('../models/BookIssue');

// const router = express.Router();

// // Admin dashboard
// router.get('/adminlogin', async (req, res) => {
//     if (!req.session.isAdmin) {
//         return res.redirect('/login.html'); // Redirect to login if not authenticated
//     }

//     try {
//         const requests = await Request.find();
//         const issuedBooks = await BookIssue.find();
//         res.render('adminlogin', { requests, issuedBooks });
//     } catch (err) {
//         console.error("Error loading admin data:", err);
//         res.status(500).send("Error loading admin panel");
//     }
// });

// module.exports = router;
// const express = require('express');
// const path = require('path');
// const Request = require('../models/Request');      // For pending book requests
// const BookIssue = require('../models/BookIssue');  // ✅ New: For issued books

// const router = express.Router();

// // Admin login page
// router.get('/adminlogin', async (req, res) => {
//     try {
//         res.sendFile(path.join(__dirname, '..', 'public', 'adminlogin.html'));
//     } catch (err) {
//         console.error("Error loading admin login page:", err);
//         res.status(500).send("Error loading page");
//     }
// });

// // Fetch all book requests (pending)
// router.get('/fetch-requests', async (req, res) => {
//     try {
//         const data = await Request.find();
//         res.json(data);
//     } catch (err) {
//         console.error("Error fetching book requests:", err);
//         res.status(500).json({ error: "Failed to fetch book requests" });
//     }
// });

// // ✅ Fetch all issued books
// router.get('/fetch-issued', async (req, res) => {
//     try {
//         const issuedBooks = await BookIssue.find();
//         res.json(issuedBooks);
//     } catch (err) {
//         console.error("Error fetching issued books:", err);
//         res.status(500).json({ error: "Failed to fetch issued books" });
//     }
// });

// module.exports = router;


const express = require('express');
const Request = require('../models/Request');
const BookIssue = require('../models/BookIssue');

const router = express.Router();

router.get('/adminlogin', async (req, res) => {
    try {
        const requests = await Request.find(); // All pending requests
        const records = await BookIssue.find(); // All issued books
        res.render('adminlogin', { requests, records });
    } catch (err) {
        console.error("Error fetching admin data:", err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
