const Joi = require("joi");

const validateContent = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "The 'name' field is required",
    "string.empty": "The 'name' field cannot be empty",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "org"] },
    })
    .required()
    .messages({
      "any.required": "The 'email' field is required",
      "string.empty": "The 'email' field cannot be empty",
      "string.email": "Incorrect email format",
    }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "any.required": "The 'phone' field is required",
      "string.empty": "The 'phone' field cannot be empty",
      "string.pattern.base":
        "The phone number format is incorrect. Use the format (XXX) XXX-XXXX",
    }),
});

module.exports = validateContent;
