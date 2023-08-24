const { Schema, model } = require("mongoose");

const { validateContent, validateFavorite } = require("../schema/index");

const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contacts", contactsSchema);

const addAndUpdateContactSchema = validateContent;
const updateFavoriteContactSchema = validateFavorite;

const schema = {
  addAndUpdateContactSchema,
  updateFavoriteContactSchema,
};

module.exports = { Contact, schema };
