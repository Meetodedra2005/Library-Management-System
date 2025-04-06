const mongoose = require('mongoose');

const BookIssueSchema = new mongoose.Schema({
    Student_name: { type: String, required: true },
    Student_id: { type: String, required: true },
    Sem: { type: Number, required: true },
    Book_name: { type: String, required: true },
    Issue_date: { type: Date, default: Date.now }
});

module.exports = mongoose.models.BookIssue || mongoose.model('BookIssue', BookIssueSchema);
