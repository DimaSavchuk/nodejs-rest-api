const express = require("express");
const contactRouter = express.Router();
const isValidId = require("../../middlewares/isValidObjectId");
const {
  contactsControllers: crtlContacts,
} = require("../../controllers/index");

contactRouter.get("/contacts", crtlContacts.addContact);
contactRouter.get("/contacts/:id", isValidId, crtlContacts.getContactById);
contactRouter.post("/contacts", crtlContacts.addContact);
contactRouter.delete("/contacts/:id", isValidId, crtlContacts.removeContact);
contactRouter.put("/contacts/:id", isValidId, crtlContacts.updateContact);
contactRouter.patch("/contacts/:id/favorite", isValidId, crtlContacts.favorite);

module.exports = contactRouter;
