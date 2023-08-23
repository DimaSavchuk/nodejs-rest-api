const express = require("express");
const contactRouter = express.Router();
const isValidId = require("../../middlewares/isValidObjectId");
const contactsController = require("../../controllers/contactsController");

console.log(contactsController);

contactRouter.get("/contacts", contactsController.listCotntacts);
contactRouter.get(
  "/contacts/:id",
  isValidId,
  contactsController.getContactById
);
contactRouter.post("/contacts", contactsController.addContact);
contactRouter.delete(
  "/contacts/:id",
  isValidId,
  contactsController.removeContact
);
contactRouter.put("/contacts/:id", isValidId, contactsController.updateContact);

contactRouter.patch(
  "/contacts/:id/favorite",
  isValidId,
  contactsController.favorite
);

module.exports = contactRouter;
