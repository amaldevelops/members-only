const db = require("../db/dbQueries");

async function homePageNotLogged(req, res) {
  const allMessages = await db.SQLUnauthorizedGetAllMessages();
  console.log(allMessages);
  res.render("index");
}

async function newMessage(req, res) {
  res.render("newMessage");
}

async function userAuthorized(req, res) {
  res.render("authorized");
}

async function userNotAuthorized(req, res) {
  res.render("notAuthorized");
}

module.exports = {
  homePageNotLogged,
  newMessage,
  userAuthorized,
  userNotAuthorized,
};
