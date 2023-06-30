const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const { ensureAuth } = require('../middleware/auth')

// @desc    Show add page
// @route   GET /task/add
router.get('/add', ensureAuth, taskController.showAddTask)

// @desc    Process add form
// @route   POST /task
router.post('/addTask', ensureAuth, taskController.createTask)

// @desc    Show sorted taskList
// @route   GET /task
router.get('/', ensureAuth, taskController.showTasks)

// @desc    Show edit page
// @route   GET /task/edit/:id
// router.get("/edit/:id", ensureAuth, taskController.showEditPage);

// @desc    Update task
// @route   PUT /task/:id
// router.put("/:id", ensureAuth, taskController.updateTask);

module.exports = router