const { body, validationResult } = require("express-validator");


const emailError = "Must be an E-mail address as username";

const validateUserLogin = [
    body("username")
    .trim()
    .notEmpty()
    .escape()
    .isEmail()
    .normalizeEmail() // Sanitizes and normalizes email input
    .withMessage(`Username: ${emailError}`),
  body("password")
    .trim()
    .escape() // Escapes HTML characters like <, >, &, etc.
];

module.exports = { validateUserLogin };
