const db = require("../db/dbQueries");

const pool = require("../db/pool");

const { body, validationResult } = require("express-validator");

require("dotenv").config();

const session = require("express-session");


async function homePageNotLogged(req, res, next) {
  try {
    const allMessages = await db.SQLUnauthorizedGetAllMessages();
    console.log(allMessages);
    res.render("index", { allMessages: allMessages });
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
    res.render("authorized", { allMessages: allMessages });
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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("error", {
        errors: errors.array(),
      });
    }

    const newMessage = {
      title: req.body.title,
      content: req.body.content,
      author_name: req.body.author_name,
      author_id: req.body.author_id,
    };

    const messageSave = await db.SQLAuthorizedNewMessageSave(newMessage);

    const allMessages = await db.SQLAuthorizedGetAllMessages();
    res.render("authorized", { allMessages: allMessages });
  } catch (err) {
    next(err);
    // res.send("Invalid Signup form")
  }
}

async function AuthenticateUser(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("error", {
        errors: errors.array(),
      });
    }

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("error", {
        errors: errors.array(),
      });
    }
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

    res.render("accountcreated");

    console.log(newUserData);
  } catch (err) {
    console.error("Error Creating user:", err.message);
    next(err);
  }
}

async function DeleteMessage(req, res, next) {
  try {
    const messageID = req.params.id;
    console.log(messageID);

    await db.SQLDeleteMessage(messageID);
    res.render("messagedeleted");
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
