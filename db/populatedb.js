#! /usr/bin/env node

const { Client } = require("pg");

require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS members_only
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,


`;

async function main() {
  console.log("Seeding data to database....");

  const client = new Client({
    connectionString: `${process.env.URI_PRODUCTION}`,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("Database Populated successfully !");
}

main();