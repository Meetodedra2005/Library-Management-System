const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer');
const session = require('express-session');

// Routes
const homeRoutes = require('./home');
const requestRoutes = require('./request');
const adminloginRoutes = require('./adminlogin');

// Models
const Request = require('../models/Request');
const BookIssue = require('../models/BookIssue');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session middleware
app.use(session({
    secret: '61436d333f5dc558c2a6be32c90baea76f5a8b2b2cb5b6305a239c34ecf02245',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'devennirmal109@gmail.com',         // Replace with your Gmail
        pass: 'oqphqimsnfxmgqli'                  // Replace with your Gmail App Password
    }
});

// Middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(homeRoutes);
app.use(requestRoutes);
app.use(adminloginRoutes);

// Admin login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin123") {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Handle Accept/Reject Request
app.post('/handle-request/:id/:action', async (req, res) => {
    try {
        const { id, action } = req.params;
        const bookRequest = await Request.findById(id);

        if (!bookRequest) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        const email = `${bookRequest.Student_id}@charusat.edu.in`;
        let subject = '';
        let message = '';

        if (action === 'accept') {
            const issuedBook = new BookIssue({
                Student_name: bookRequest.Student_name,
                Student_id: bookRequest.Student_id,
                Sem: bookRequest.Sem,
                Book_name: bookRequest.Book_name,
                Issue_date: new Date()
            });

            await issuedBook.save();

            subject = 'Book Request Accepted';
            message = `Hello ${bookRequest.Student_name},\n\nYour request for the book "${bookRequest.Book_name}" has been accepted.\nYou can collect it from the library today. Please return it within 10 days.\n\nRegards,\nLibrary Team`;

        } else if (action === 'decline') {
            subject = 'Book Request Rejected';
            message = `Hello ${bookRequest.Student_name},\n\nWe regret to inform you that your request for the book "${bookRequest.Book_name}" has been rejected due to unavailability of book.\nPlease contact the librarian for further details.\n\nRegards,\nLibrary Team`;
        } else {
            return res.status(400).json({ success: false, message: "Invalid action" });
        }

        const mailOptions = {
            from: 'devennirmal109@gmail.com',
            to: email,
            subject: subject,
            text: message
        };

        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);

        await Request.findByIdAndDelete(id);

        res.json({ success: true, message: `Request ${action}ed and email sent.` });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Library_management')
    .then(() => console.log("Database connected to Library management"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
