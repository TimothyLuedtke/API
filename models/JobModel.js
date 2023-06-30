const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    contactId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        required: false,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: false,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: false,
    }],
    jobTitle: {
        type: String,
        required: true,
    },
    jobURL: String,
    jobDescription: String,
    jobLocation: String,
    jobNotes: [String]
    
})

module.exports = mongoose.model('Job', JobSchema)
