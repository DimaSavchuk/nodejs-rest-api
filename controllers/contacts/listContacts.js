const { ContactsModel } = require("../../models");
const { Contact } = ContactsModel;

const asyncHandler = require("express-async-handler");

const listCotntacts = asyncHandler(async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, favorite } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }

  const contacts = await Contact.find({}, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.status(200).json({
    code: 200,
    message: "success",
    data: contacts,
  });
});

module.exports = listCotntacts;
