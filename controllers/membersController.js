const db = require("../db/dbQueries");

require("dotenv").config();

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
    const newMessage = {
      title: req.body.title,
      content: req.body.content,
      author_name: req.body.author_name,
      author_id: req.body.author_id,
    };

    // console.log(newMessage);
    const messageSave = await db.SQLAuthorizedNewMessageSave(newMessage);
  } catch (err) {
    next(err);
    // res.send("Invalid Signup form")
  }
}

async function AuthenticateUser(req, res, next) {
  try {
    const authenticationData = {
      username: req.body.username,
      password: req.body.password,
    };

    const checkForUserDetails = await db.SQLAuthenticateUser(
      authenticationData
    );
    // console.log(authenticationData);
    console.log(checkForUserDetails);

    if (checkForUserDetails.success === true) {
      res.render("authorized");
    } else {
      res.render("notAuthorized");
    }
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

    if (
      newUserData.membership_status === process.env.INVITATION_CODE &&
      newUserData.admin === process.env.ADMIN_CODE
    ) {
      newUserData.membership_status = true;
      newUserData.admin = true;
    } else if (newUserData.membership_status === process.env.INVITATION_CODE) {
      newUserData.membership_status = true;
      newUserData.admin = false;
    } else if (newUserData.admin === process.env.ADMIN_CODE) {
      newUserData.membership_status = false;
      newUserData.admin = true;
    } else {
      newUserData.membership_status = false;
      newUserData.admin = false;
    }

    const createUser = await db.SQLNewUserCreate(newUserData);

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
