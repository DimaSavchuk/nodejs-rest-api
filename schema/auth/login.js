const Joi = require("joi");

const login = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      "any.required": "The 'email' field is required",
      "string.empty": "The 'email' field cannot be empty",
      "string.email": "Incorrect email format",
    }),
  password: Joi.string()
    .required()
    .min(6)
    .message("The password must contain at least 6 characters."),
});

module.exports = login;
