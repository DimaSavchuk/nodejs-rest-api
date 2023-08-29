const { Schema, model } = require("mongoose");

const { contacts } = require("../schema");
const validate = contacts;

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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Contact = model("contacts", contactsSchema);

const addAndUpdateContactSchema = validate.validateContent;
const updateFavoriteContactSchema = validate.validateFavorite;

const schema = {
  addAndUpdateContactSchema,
  updateFavoriteContactSchema,
};

module.exports = { Contact, schema };
