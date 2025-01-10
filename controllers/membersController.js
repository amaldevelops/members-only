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

async function userAuthorized(req, res,next) {
  try {
    const allMessages = await db.SQLAuthorizedGetAllMessages();
    console.log(allMessages);
    res.render("authorized");
  } catch (err) {
    next(err);
  }
}

async function userNotAuthorized(req, res,next) {
  try {
    res.render("notAuthorized");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  homePageNotLogged,
  newMessage,
  userAuthorized,
  userNotAuthorized,
};
