const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const { ensureAuth, isAuthorized } = require("../middleware/auth");

//@desc Auth with Google
//@route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect to companies page
    res.redirect("/company");
  }
);

//@desc Auth with Local
//@route GET /auth/local
router.get("/local", authController.getLogin);


module.exports = router;
