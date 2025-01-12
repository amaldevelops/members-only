const { Router } = require("express");

const appRouter = Router();

const membersController = require("../controllers/membersController");

appRouter.get("/", membersController.homePageNotLogged);
appRouter.post("/", membersController.AuthenticateUser);

appRouter.get("/new", membersController.newMessage);

appRouter.post("/new", membersController.AuthorizedNewMessageSave);

// appRouter.post("authorized",membersController.AuthenticateUser);
appRouter.get("/authorized", membersController.userAuthorized);
// appRouter.post("/authorized", );

appRouter.post("/accountcreated", membersController.NewUserCreate)


appRouter.get("/notauthorized", membersController.userNotAuthorized);

module.exports = appRouter;
