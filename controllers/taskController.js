const Task = require('../models/TaskModel')
const Contact = require('../models/ContactModel')
const Company = require('../models/CompanyModel')
const Job = require('../models/JobModel')

// @desc    Show add page
// @route   GET /task/add
exports.showAddTask = async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.user.id }).lean()
        const companies = await Company.find({ userId: req.user.id }).lean()
        const jobs = await Job.find({ userId: req.user.id }).lean()
        res.render("addTask.ejs", {
            contacts,
            companies,
            jobs
        })
    } catch (err) {
        console.error(err)
        // res.render("error/500")
    }
}

// @desc    Process add form
// @route   POST /task
exports.createTask = async (req, res) => {
    console.log("request body: ", req.body)
    try {
        // Get user id
        const uniqID = await req.user.id
        // Extract data from req.body
        const {
            companyId,
            jobId,
            contactId,
            taskName,
            taskDescription,
            dueDate,
            status,
            comments
        } = req.body

        // Create a new task
        const task = {
            userId: uniqID,
            taskName: taskName,
            taskDescription: taskDescription,
            dueDate: dueDate,
            status: status,
            comments: comments,
        }
        // if the user selected a company, add the id to the task object
        if (companyId) {
            task.companyId = companyId;
        }
        // if the user selected a job, add the id to the task object
        if (jobId) {
            task.jobId = jobId;
        }
        // if the user selected a contact, add the id to the task object
        if (contactId) {
            task.contactId = contactId;
        }
        // Save the new task
        await Task.create(task)
        // Console log the task object
        console.log("Saved new task to db: ", task)
        // Redirect to task list
        res.redirect("/task")
    } catch (err) {
        console.error(err)
        // res.render("error/500")
    }
},

    // @desc    Show sorted tasks
    // @route   GET /task
    exports.showTasks = async (req, res) => {
        try {
            // extract the sort value from the query string
            const sort = req.query.sort;
            // set the sort direction
            const sortDirection = req.query.sortDirection;
            // extract the user id from the request
            const uniqID = await req.user.id
            // retrieve the tasks from the database
            const tasks = await Task.find({ userId: uniqID })
                .populate("companyId")
                .populate("jobId")
                .populate("contactId")
                // sort the tasks
                .sort({ taskName: sortDirection })
                .lean()

            // console.log("tasks: ", tasks)
            // render the task list
            res.render("taskList.ejs", {
                tasks,
                sort
            })
        } catch (err) {
            console.error(err)
            // res.render("error/500")
        }
    }

// @desc    Show edit page
// @route   GET /task/edit/:id
// exports.showEditTask = async (req, res) => {
//     try {
//         // extract the id from the request
//         const id = req.params.id;
//         // retrieve the task from the database
//         const task = await Task.findOne({ _id: id }).lean()
//         const contacts = await Contact.find({ userId: req.user.id }).lean()
//         const companies = await Company.find({ userId: req.user.id }).lean()
//         const jobs = await JobListing.find({ userId: req.user.id }).lean()
//         // render the edit page
//         res.render("editTask.ejs", {
//             task,
//             contacts,
//             companies,
//             jobs
//         })
//     } catch (err) {
//         console.error(err)
//         // res.render("error/500")
//     }
// }