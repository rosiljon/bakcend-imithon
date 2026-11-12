const Joi = require("joi");

const registerValidationSchema = Joi.object({
  first_name: Joi.string().required().trim().min(3).max(30),
  parol: Joi.string()
    .required()
    .min(8)
    .max(30)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/),
  last_name: Joi.string().allow(""),
  login: Joi.string().allow(""),
  phone_number: Joi.string().pattern(/^\+998\d{9}$/).allow(""),
  is_active: Joi.string().allow("")
})

const updateStuffValidationSchema = Joi.object({
  first_name: Joi.string().trim().min(3).max(30),
  parol: Joi.string()
    .min(8)
    .max(30)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/),
  first_name: Joi.string().allow(""),
  is_active: Joi.string().allow(""),
  phone_number: Joi.string().pattern(/^\+998\d{9}$/).allow(""),
}).min(1);

module.exports = {
  registerValidationSchema,
  updateStuffValidationSchema,
};