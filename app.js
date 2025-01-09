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

app.listen(process.env.APP_PORT, () =>
  console.log(`Members Only Site Running on localhost:${process.env.APP_PORT}`)
);
