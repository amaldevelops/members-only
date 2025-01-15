const db = require("../db/dbQueries");

const pool = require("../db/pool");

const bcrypt = require("bcryptjs");

const { body, validationResult } = require("express-validator");

require("dotenv").config();

const session = require("express-session");

async function homePageNotLogged(req, res, next) {
  try {
    const allMessages = await db.SQLUnauthorizedGetAllMessages();
    res.render("index", { allMessages: allMessages });
  } catch (err) {
    next(err);
  }
}

async function newMessage(req, res, next) {
  try {
    res.render("newMessage", { loggedInUserDetails: req.user });
  } catch (err) {
    next(err);
  }
}

async function userAuthenticationFormValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("error", {
      errors: errors.array(),
    });
  }
  next();
}

async function userAuthorized(req, res, next) {
  try {
    const allMessages = await db.SQLAuthorizedGetAllMessages();
    console.log(`User is: ${req.user.id}`);
    res.render("authorized", {
      allMessages: allMessages,
      loggedInUserDetails: req.user,
    });
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
    res.render("authorized", {
      allMessages: allMessages,
      loggedInUserDetails: req.user,
    });
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

    newUserData.password = await bcrypt.hash(newUserData.password, 10);
    console.log(newUserData.password);
    await db.SQLNewUserCreate(newUserData);

    res.render("accountcreated");
  } catch (errors) {
    console.error("Error Creating user:", errors.message);
    return res.status(500).render("error Creating User");
  }
}

async function DeleteMessage(req, res, next) {
  try {
    const messageID = req.params.id;

    await db.SQLDeleteMessage(messageID);
    res.render("messagedeleted");
  } catch (err) {
    next(err);
  }
}

async function logOut(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.render("logOut");
  });
}

async function getUpdateUserDetails(req, res, next) {
  try {
    res.render("updateUserDetails", { loggedInUserDetails: req.user });
  } catch (err) {
    next(err);
  }
}

async function PostUpdateUserDetails(req, res, next) {
  try {
    const newUserData = {
      membership_status: req.body.membership_status,
    };

    if (newUserData.membership_status === process.env.INVITATION_CODE) {
      await db.SQLUpdateUserDetails(req.user.id);
    } else {
      newUserData.membership_status = false;
    }

    res.redirect("/authorized");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  NewUserCreate,
  homePageNotLogged,
  newMessage,
  DeleteMessage,
  userAuthorized,
  userNotAuthorized,
  AuthorizedNewMessageSave,
  userAuthenticationFormValidation,
  logOut,
  getUpdateUserDetails,
  PostUpdateUserDetails,
};
