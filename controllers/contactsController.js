const constants = require("../models/contacts");

const { HttpError } = require("../utils/index");
const { addContactShema } = require("../schema/index");

const listCotntacts = async (req, res, next) => {
  try {
    const result = await constants.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await constants.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = addContactShema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const body = req.body;
    const result = await constants.addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await constants.removeContact(contactId);
    if (!result) {
      return HttpError(400, "Not Found");
    }
    res.status(200).json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = addContactShema.validate(req.body);
    if (error) {
      throw HttpError(400, (error.message = "missing fields"));
    }
    const { contactId } = req.params;
    const result = await constants.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listCotntacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
