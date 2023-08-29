const { ContactsModel } = require("../../models");
const { Contact, schema } = ContactsModel;

const asyncHandler = require("express-async-handler");

const addContact = asyncHandler(async (req, res) => {
  const { error } = schema.addAndUpdateContactSchema.validate(req.body);
  if (error) {
    res.status(400);
    console.log(`${error.message}`.red.bold);
    throw new Error("Check the data you entered");
  }
  const { _id: owner } = req.user;
  const contact = await Contact.create({
    ...req.body,
    owner,
  });
  res.status(201).json({
    code: 201,
    message: "success",
    data: contact,
  });
});

module.exports = addContact;
