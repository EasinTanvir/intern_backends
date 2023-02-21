const mongoose = require("mongoose");
const ContactFormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: false,
  }
);

ContactFormSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("contact-forms", ContactFormSchema);
