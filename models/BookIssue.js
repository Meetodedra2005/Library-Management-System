const mongoose = require('mongoose');

const BookIssueSchema = new mongoose.Schema({
    Student_name: { type: String, required: true },
    Student_id: { type: String, required: true },
    Sem: { type: Number, required: true },
    Book_name: { type: String, required: true },
    Issue_date: { type: Date, default: Date.now },
    Return_date: { 
        type: Date, 
        default: () => new Date(Date.now() + 60 * 1000) // current time + 1 minute
    }
});

module.exports = mongoose.models.BookIssue || mongoose.model('BookIssue', BookIssueSchema);
