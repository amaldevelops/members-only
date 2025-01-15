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
  validateUserLogin,
  membersController.userAuthenticationFormValidation,
  passport.authenticate("local", {
    successRedirect: "/authorized",
    failureRedirect: "/notauthorized",
  })
);

appRouter.get("/", membersController.homePageNotLogged);

appRouter.get("/logOut", membersController.logOut);

appRouter.get("/new", ensureAuthentication, membersController.newMessage);

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

appRouter.post(
  "/accountcreated",
  validateUserCreation,
  membersController.NewUserCreate
);

appRouter.get("/updateuserdetails", membersController.getUpdateUserDetails);
appRouter.post("/updateuserdetails", membersController.PostUpdateUserDetails);

appRouter.post("/messagedeleted:id", membersController.DeleteMessage);

appRouter.get("/notauthorized", membersController.userNotAuthorized);

module.exports = appRouter;
