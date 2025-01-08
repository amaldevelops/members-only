const path = require("node:path");
const express = require("express");

require("dotenv").config();

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.APP_PORT, () =>
  console.log(`Members Only Site Running on localhost:${process.env.APP_PORT}`)
);
