const { Contact, schema } = require("../models/ContactsModel");
const asyncHandler = require("express-async-handler");
const { addContactShema } = require("../schema/validateContent");
class Contacts {
  listCotntacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({}, "-createdAt -updatedAt");
    res.status(200).json({
      code: 200,
      message: "success",
      data: contacts,
    });
  });

  getContactById = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(
      req.params.id,
      "-createdAt -updatedAt"
    );
    if (!contact) {
      res.status(404);
      throw new Error(`Contact with id ${id} not found`);
    }
    res.status(200).json({
      code: 200,
      message: "success",
      data: contact,
    });
  });

  addContact = asyncHandler(async (req, res) => {
    const { error } = schema.addAndUpdateContactSchema.validate(req.body);
    if (error) {
      res.status(400);
      console.log(`${error.message}`.red.bold);
      throw new Error("Check the data you entered");
    }
    const contact = await Contact.create({
      ...req.body,
    });
    res.status(201).json({
      code: 201,
      message: "success",
      data: contact,
    });
  });

  removeContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndRemove(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error(`Contact with id ${id} not found`);
    }
    res.status(200).json({
      code: 200,
      message: "success",
      data: contact,
    });
  });

  updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!contact) {
      res.status(404);
      throw new Error(`Contact with id ${id} not found`);
    }

    const { error } = schema.addAndUpdateContactSchema.validate(req.body);
    if (error) {
      res.status(400);
      console.log(`${error.message}`.red.bold);
      throw new Error("Check the data you entered");
    }

    res.status(200).json({
      code: 200,
      message: "success",
      data: contact,
    });
  });

  favorite = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!contact) {
      res.status(404);
      throw new Error(`Contact with id ${id} not found`);
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
}

module.exports = new Contacts();
