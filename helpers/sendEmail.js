const asyncHandler = require("express-async-handler");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const path = require("path");

const configPath = path.join(__dirname, "..", "config", ".env");
require("dotenv").config({ path: configPath });

const { MAILGUN_API_KYE, DOMAIN_NAME } = process.env;

const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: MAILGUN_API_KYE,
});

const sendEmail = asyncHandler(async (data) => {
  const email = {
    ...data,
    from: "'Dima Savchuk' <dima.savchuk.011@gmail.com>",
  };
  await mg.messages.create(DOMAIN_NAME, email);
  return true;
});

module.exports = sendEmail;
