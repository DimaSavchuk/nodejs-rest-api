const express = require("express");
const { authControllers } = require("../../controllers");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");
const authRouter = express.Router();

authRouter.post("/register", authControllers.register);
authRouter.post("/login", authControllers.login);

authRouter.post("/logout", authenticate, authControllers.logout);
authRouter.get("/current", authenticate, authControllers.getCurrent);
authRouter.patch("/", authenticate, authControllers.subscriptionUpdate);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.avatarUpdate
);
authRouter.get("/verify/:verificationToken", authControllers.verify);
authRouter.post("/verify", authControllers.reverify);

module.exports = authRouter;
