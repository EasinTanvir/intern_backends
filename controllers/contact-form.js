const HttpError = require("../helper/HttpError");
const ContactForm = require("../models/contact-form");

const contactForm = async (req, res, next) => {
  let newUser;

  try {
    newUser = await ContactForm.create(req.body);
  } catch (err) {
    const errors = new HttpError("Sorry something went wrong", 500);
    return next(errors);
  }
  res.status(200).json(newUser);
};

module.exports = {
  contactForm,
};
