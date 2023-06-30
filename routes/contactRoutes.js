const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { ensureAuth } = require("../middleware/auth");

// @desc    Show add page
// @route   GET /contact/add
router.get("/add", ensureAuth, contactController.showAddContact);

// @desc    Process add form
// @route   POST /contact
router.post("/addContact", ensureAuth, contactController.createContact);

// @desc    Show sorted contactList
// @route   GET /contact
router.get("/", ensureAuth, contactController.showContacts);

// @desc    Show edit page
// @route   GET /contact/edit/:id
// router.get("/edit/:id", ensureAuth, contactController.showEditPage);

// @desc    Update contact
// @route   PUT /contact/:id
// router.put("/:id", ensureAuth, contactController.updateContact);

// @desc    Delete contact
// @route   DELETE /contact/:id
// router.delete("/:id", ensureAuth, contactController.deleteContact);


module.exports = router;