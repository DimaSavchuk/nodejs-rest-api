const express = require("express");
const contactRouter = express.Router();
const isValidId = require("../../middlewares/isValidObjectId");
const {
  contactsControllers: crtlContacts,
} = require("../../controllers/index");

const authenticate = require("../../middlewares/authenticate");

contactRouter.get("/", authenticate, crtlContacts.listContacts);
contactRouter.get("/:id", authenticate, isValidId, crtlContacts.getContactById);
contactRouter.post("/", authenticate, crtlContacts.addContact);
contactRouter.delete(
  "/:id",
  authenticate,
  isValidId,
  crtlContacts.removeContact
);
contactRouter.put("/:id", authenticate, isValidId, crtlContacts.updateContact);
contactRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  crtlContacts.favorite
);

module.exports = contactRouter;
