const { Router } = require("express");

const appRouter = Router();

const {
  passport,
  ensureAuthentication,
} = require("../security/passportConfig");

const membersController = require("../controllers/membersController");

const { validateUserCreation } = require("../validators/signupFormValidation");

const { validateUserLogin } = require("../validators/signInFormValidation");

const {
  validateNewMessage,
} = require("../validators/newMessageFormValidation");

appRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/authorized",
    failureRedirect: "/notauthorized",
  })
);

appRouter.get("/", membersController.homePageNotLogged);

// appRouter.post("/", validateUserLogin, membersController.AuthenticateUser);

appRouter.get("/new", membersController.newMessage);

appRouter.post(
  "/new",
  validateNewMessage,
  membersController.AuthorizedNewMessageSave
);

appRouter.get(
  "/authorized",
  ensureAuthentication,
  membersController.userAuthorized
);

// Create User Signup form with Form validation and sanitization (validateUserCreation)
appRouter.post(
  "/accountcreated",
  validateUserCreation,
  membersController.NewUserCreate
);

appRouter.post("/messagedeleted:id", membersController.DeleteMessage);

appRouter.get("/notauthorized", membersController.userNotAuthorized);

module.exports = appRouter;
