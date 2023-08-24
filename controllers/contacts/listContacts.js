const { Contact } = require("../../models/ContactsModel");
const asyncHandler = require("express-async-handler");

const listCotntacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  res.status(200).json({
    code: 200,
    message: "success",
    data: contacts,
  });
});

module.exports = listCotntacts;
