const express = require("express");

const router = express.Router();

const constants = require("../../models/contacts");
const { HttpError } = require("../../utils/index");

const Joi = require("joi");

const addContactShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "uk", "org"] },
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await constants.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
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
});

router.post("/", async (req, res, next) => {
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
});

router.delete("/:contactId", async (req, res, next) => {
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
});

router.put("/:contactId", async (req, res, next) => {
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
});

module.exports = router;
