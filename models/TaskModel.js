const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
  }, 
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: String,
  dueDate: Date,
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  },
  comments: [String],
})

module.exports = mongoose.model('Task', TaskSchema)