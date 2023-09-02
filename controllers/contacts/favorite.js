const { ContactsModel } = require("../../models");
const { Contact, schema } = ContactsModel;

const asyncHandler = require("express-async-handler");

const favorite = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  if (!contact) {
    res.status(404);
    throw new Error(`Contact with id ${req.params.id} not found`);
  }

  const { error } = schema.updateFavoriteContactSchema.validate(req.body);

  if (error) {
    res.status(400);
    console.log(`${error.message}`.red.bold);
    throw new Error(`${error.message}`);
  }

  res.status(200).json({
    code: 200,
    message: "success",
    data: contact,
  });
});

module.exports = favorite;
