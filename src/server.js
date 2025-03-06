const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const homeRoutes = require('./home');
const requestRoutes = require('./request');
const adminloginroutes = require('./adminlogin');

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware setup
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.json()); // Replacing body-parser.json()

// Use routes from home.js and request.js
app.use(homeRoutes);
app.use(requestRoutes);
app.use(adminloginroutes);

// app.post("/login", (req, res) => {
//     const { username, password } = req.body;

//     // Dummy credentials (replace with a database check if needed)
//     if (username === "admin" && password === "admin123") {
//         res.json({ success: true });
//     } else {
//         res.json({ success: false });
//     }
// });

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Hardcoded credentials (Replace this with database authentication)
    const adminUser = "admin";
    const adminPass = "admin123";

    if (username === adminUser && password === adminPass) {
        res.json({ success: true }); // Send success response
    } else {
        res.json({ success: false }); // Send failure response
    }
});


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
