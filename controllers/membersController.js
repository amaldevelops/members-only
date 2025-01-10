const db = require("../db/dbQueries");

async function homePageNotLogged(req, res, next) {
  try {
    const allMessages = await db.SQLUnauthorizedGetAllMessages();
    // console.log(allMessages);
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
    // console.log(allMessages);
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
    const authenticationData = {
      username: req.body.username,
      password: req.body.password,
    };
    console.log(authenticationData);
  } catch (err) {
    next(err);
  }
}

async function NewUserCreate(req, res, next) {
  try {
    const newUserData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
      password_confirm: req.body.password_confirm,
      membership_status: req.body.membership_status,
      admin: req.body.admin,
    };

    console.log(newUserData);
    
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
