#! /usr/bin/env node

const { Pool } = require("pg");

require("dotenv").config();

module.exports = new Pool({
  host: process.env.DBHost,
  user: process.env.DBUser,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PW,
  port: process.env.DATABASE_PORT,
  ssl: false,
});
