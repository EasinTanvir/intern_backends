const express = require("express");
const router = express.Router();
const contactForm = require("../controllers/contact-form");

router.route("/create").post(contactForm.contactForm);

module.exports = router;
