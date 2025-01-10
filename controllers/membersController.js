const db = require("../db/dbQueries");

async function homePageNotLogged(req, res, next) {
  try {
    const allMessages = await db.SQLUnauthorizedGetAllMessages();
    console.log(allMessages);
    res.render("index");
  } catch (err) {
    next(err);
  }
}

async function newMessage(req, res, next) {
  try {
    res.render("newMessage");
  } catch (err) {
    next(err);
  }
}

async function userAuthorized(req, res, next) {
  try {
    const allMessages = await db.SQLAuthorizedGetAllMessages();
    console.log(allMessages);
    res.render("authorized");
  } catch (err) {
    next(err);
  }
}

async function userNotAuthorized(req, res, next) {
  try {
    res.render("notAuthorized");
  } catch (err) {
    next(err);
  }
}

async function AuthorizedNewMessageSave(req, res, next) {
  try {
    const messageSave = await db.SQLAuthorizedNewMessageSave();
  } catch (err) {
    next(err);
  }
}

async function AuthenticateUser(req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
}

async function NewUserCreate(req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
}

async function DeleteMessage(req, res, next) {
  try {
  } catch (err) {
    next(err);
  }
}

module.exports = {
  AuthenticateUser,
  NewUserCreate,
  homePageNotLogged,
  newMessage,
  DeleteMessage,
  userAuthorized,
  userNotAuthorized,
  AuthorizedNewMessageSave,
};
