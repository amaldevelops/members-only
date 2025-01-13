const { body, validationResult } = require("express-validator");


const emailError = "Must be an E-mail address as username";

const validateNewMessage = [
    body("title")
    .trim()
    .notEmpty()
    .withMessage("Empty Message Title")
    .escape(),
    body("content")
    .trim()
    .notEmpty()
    .withMessage("Empty Message Content")
    .escape(),
    body("author_name")
    .trim()
    .notEmpty()
    .withMessage("Empty Author Name")
    .escape(),
    body("author_id")
    .trim()
    .notEmpty()
    .isInt()
    .withMessage("Author ID must be an integer")
    .escape(),
];

module.exports = { validateNewMessage };
