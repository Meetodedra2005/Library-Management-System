const mongoose = require('mongoose');

const BookIssueSchema = new mongoose.Schema({
    Student_name: { type: String, required: true },
    Student_id: { type: String, required: true },
    Sem: { type: Number, required: true },
    Book_name: { type: String, required: true },
    Issue_date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Book_issue', BookIssueSchema);
