const express = require("express");
const { authControllers } = require("../../controllers");
const authenticate = require("../../middlewares/authenticate");
const authRouter = express.Router();

authRouter.post("/register", authControllers.register);
authRouter.post("/login", authControllers.login);

authRouter.post("/logout", authenticate, authControllers.logout);
authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.patch("/", authenticate, authControllers.subscriptionUpdate);

module.exports = authRouter;
