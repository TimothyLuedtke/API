const Company = require('../models/CompanyModel')
const Job = require('../models/JobModel')
const Contact = require('../models/ContactModel')
const Task = require('../models/TaskModel')

// @desc    Show add page
// @route   GET /job/add
exports.showAddJob = async (req, res) => {
    try {
        const contacts = await Contact.find({ userId: req.user.id }).lean()
        const companies = await Company.find({ userId: req.user.id }).lean()
        res.render("addJob.ejs", {
            contacts,
            companies
        })
    } catch (err) {
        console.error(err)
        // res.render("error/500")
    }
}

// @desc    Process add form
// @route   POST /job
exports.createJob = async (req, res) => {
    console.log("request body: ", req.body)
    try {
        // Get user id
        const uniqID = await req.user.id
        // Extract data from req.body
        const { 
            company,
            contact,
            jobTitle,
            jobURL,
            jobDescription,
            jobLocation,
            jobNotes
        } = req.body

        // Create new job
        const job = {
            userId: uniqID,
            jobTitle: jobTitle,
            jobURL: jobURL,
            jobDescription: jobDescription,
            jobLocation: jobLocation,
            jobNotes: jobNotes,
        };
        // if the user selected a company, add the id to the job object
        if (company) {
            job.companyId = company;
        }
        // if the user selected a contact, add the id to the job object
        if (contact) {
            job.contactId = contact;
        }
        // Save job to database
        await Job.create(job)
        // Console log the job object
        console.log("Saved new job to db: ", job)
        // Redirect to job page
        res.redirect("/job")
    } catch (err) {
        console.log(err)
        // res.render("error/500")
    }
}

// @desc    Show sorted job
// @route   GET /job
exports.showJobs = async (req, res) => {
    try {
        // extract the sort value from the query string
        const sort = req.query.sort;
        // set the sort direction
        const sortDirection = sort === "asc" ? 1 : sort === "desc" ? -1 : 1;
        // extract the user id from the request
        const uniqID = await req.user.id
        // retrieve the jobs from the database along with the associated companyId and contactIds
        const jobs = await Job.find({ userId: uniqID })
            .populate("companyId")
            .populate("contactId")
            .sort({ jobTitle: sortDirection })
            .lean()
        // render the jobs page and pass the jobs data to the view
        res.render("job.ejs", {
            jobs,
            sort
        })
    } catch (err) {
        console.error(err)
        // res.render("error/500")
    }
}
