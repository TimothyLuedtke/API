const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    jobId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
    }],
    companyId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
    }],
    contactName: {
        type: String,
        required: true,
    },
    position: String,
    socialUrl: String,
    email: String,
    phone: String,
    comments: [String],
})

module.exports = mongoose.model('Contact', ContactSchema)
