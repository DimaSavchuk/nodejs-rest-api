const Joi = require("joi");

const validateFavorite = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
    "boolean.base": "field favorite must be a boolean",
  }),
});

validateFavorite.withCustomMessages = function (data) {
  const result = this.validate(data);

  if (result.error) {
    const errorMessage = result.error.details
      .map((detail) => detail.message)
      .join(", ");
    console.error("Validation error:", errorMessage);
  }

  return result;
};

module.exports = validateFavorite;
