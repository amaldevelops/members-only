const express = require("express");
const app = express();

const path = require("node:path");
const assetsPath=path.join(__dirname,"public");
app.use(express.static(assetsPath));

require("dotenv").config();

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const appRouter=require("./routes/appRouter");
app.use("/", appRouter);

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());

// Error Handling

app.use((req,res)=>{
  res.status(404).render("notAuthorized",{url:req.url});
});

app.use((err,req,res,next)=>{
  console.error(err.stack);
  res.status(500).send("Something Went Wrong, Developer please check the server logs, if you are an user contact the developer");
});

app.listen(process.env.APP_PORT || 3000, () =>
  console.log(`Members Only Site Running on localhost:${process.env.APP_PORT}`)
);

