// 
const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    Student_name: { type: String, required: true },
    Student_id: { type: String, required: true },
    Sem: { type: Number, required: true },
    Available: { type: Boolean, required: true }, 
    Book_name: { type: String, required: true },

    Issue_date: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.models.Request || mongoose.model('Request', RequestSchema); // Use same name when importing
