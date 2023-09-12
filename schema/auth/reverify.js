const Joi = require("joi");

const reverify = Joi.object({
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
});

module.exports = reverify;
