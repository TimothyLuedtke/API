const mongoose = require('mongoose')

const CompanySchema = new mongoose.Schema({
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
    required: false,
  }],
  contactId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: false,
  }],
  companyName: {
    type: String,
    required: true,
  },
  url: String,
  companyDescription: String,
  comments: String,
})

module.exports = mongoose.model('Company', CompanySchema)