const { body, validationResult } = require("express-validator");

const firstNameError = "Must Only Contain Letters";
const lengthErr = "Must Only contain between 1 to 20 Characters";
const emailError = "Must be an E-mail address as username";
const passwordError = "Password must be within 6 and 20 Characters";

const validateUserCreation = [
  body("first_name")
    .trim() // Removes leading and trailing spaces
    .escape() // Escapes HTML characters like <, >, &, etc.
    .notEmpty()
    .withMessage(`First Name ${firstNameError}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`First Name ${lengthErr}`),
  body("last_name")
    .trim()
    .notEmpty()
    .escape() // Escapes HTML characters like <, >, &, etc.
    .withMessage(`First Name ${firstNameError}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`First Name ${lengthErr}`),
  body("username")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail() // Sanitizes and normalizes email input
    .withMessage(`Username: ${emailError}`)
    .isLength({ min: 5, max: 50 })
    .withMessage(`Username: ${lengthErr}`),
  body("password")
    .trim()
    .escape() // Escapes HTML characters like <, >, &, etc.
    .isLength({ min: 6, max: 20 })
    .withMessage(`Password:${passwordError}`)
    .isLength({ min: 6, max: 20 })
    .withMessage(`Password: ${lengthErr}`),
  body("password_confirm")
    .trim()
    .escape() // Escapes HTML characters like <, >, &, etc.
    .isLength({ min: 6, max: 20 })
    .withMessage(`password_confirm:${passwordError}`)
    .isLength({ min: 6, max: 20 })
    .withMessage(`password_confirm: ${lengthErr}`)
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords Do not Match!"),
  body("membership_status").optional().trim(),
  body("admin").trim(),
];

module.exports = { validateUserCreation };
