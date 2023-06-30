const Contact = require('../models/ContactModel')
const Task = require('../models/TaskModel')
const Job = require('../models/JobModel')
const Company = require('../models/CompanyModel')

// @desc    Show add page
// @route   GET /contact/add
exports.showAddContact = async (req, res) => {
    try {
        const jobs = await Job.find({ userId: req.user.id }).lean()
        const companies = await Company.find({ userId: req.user.id }).lean()
        res.render("addContact.ejs", {
            jobs,
            companies
        })
    } catch (err) {
        console.error(err)
        // res.render("error/500")
    }
}

// @desc    Process add form --Requires modal/redirect to companyAdd if company doesn't exist
// @route   POST /contact
exports.createContact = async (req, res) => {
    console.log("request body: ", req.body)
    try {
        // Get user id
        const uniqID = await req.user.id
        // Extract data from req.body
        const {
            contactName,
            company,
            job,
            task,
            position,
            socialUrl,
            email,
            phone,
            comments
        } = req.body

        // Create new contact
        const contact= {
            userId: uniqID,
            contactName,
            position,
            socialUrl,
            email,
            phone,
            comments
        };
        // if the user selected a company, add the id to the contact object
        if (company) {
            contact.companyId = company;
        }
        // if the user selected a job, add the id to the contact object
        if (job) {
            contact.jobId = job;
        }
        // if the user selected a task, add the id to the contact object
        if (task) {
            contact.taskId = task;
        }
        // Save contact to database
        await Contact.create(contact)

        console.log("Saved new contact to db: ", contact)
        res.redirect("/contact")
    } catch (err) {
        console.error(err)
        // res.render("error/500")
    }
}

// @desc `  Show contactList
// @route   GET /contact
exports.showContacts = async (req, res) => {
    try {
        // extract the user id from the request
        const uniqID = req.user.id;
        // retrieve the contacts from the database along with the associated companyIds and jobIds
        const contacts = await Contact.find({ userId: uniqID })
            .populate("companyId")
            .populate("jobId")
            .lean();
        // render the contacts page and pass the contacts to the view
        res.render("contact.ejs", {
            contacts
        })
    } catch (err) {
        console.error(err)
        // res.render("error/500")
    }
}

// @desc    Show sorted contactList
// @route   GET /contact
exports.showContacts = async (req, res) => {
    try {
//         extract the sort value from the query string
        const sort = req.query.sort;
        // set the sort direction
        const sortDirection = sort === "asc" ? 1 : sort === "desc" ? -1 : 1;
        // extract the user id from the request
        const uniqID = req.user.id;
        // retrieve the contacts from the database along with the associated companyIds and jobIds
        const contacts = await Contact.find({ userId: uniqID })
        .populate("companyId")
        .populate("jobId")
        .sort({ contactName: sortDirection })
        .lean();
        // render the contacts page and pass the contacts to the view
        res.render("contact.ejs", {
            contacts,
            sort
        })
    } catch (err) {
        console.error(err)
        // res.render("error/500")
    }
}




