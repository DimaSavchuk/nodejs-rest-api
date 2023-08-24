const { Contact } = require("../../models/ContactsModel");
const asyncHandler = require("express-async-handler");

const removeContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndRemove(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact with id ${req.params.id} not found`);
  }
  res.status(200).json({
    code: 200,
    message: "success",
    data: contact,
  });
});

module.exports = removeContact;
