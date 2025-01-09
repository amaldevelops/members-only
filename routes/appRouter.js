const { Router } = require("express");

const appRouter = Router();

const membersController = require("../controllers/membersController");

appRouter.get("/", membersController.homePageNotLogged);

appRouter.get("/new", membersController.newMessage);

appRouter.get("/authorized", membersController.userAuthorized);

appRouter.get("/notauthorized", membersController.userNotAuthorized);

module.exports = appRouter;
