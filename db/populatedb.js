#! /usr/bin/env node

const { Client } = require("pg");

require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users_table(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR(100),
last_name VARCHAR(300),
username VARCHAR(300) UNIQUE NOT NULL,
password VARCHAR(100) NOT NULL,
membership_status VARCHAR(100),
admin BOOLEAN DEFAULT FALSE
);
INSERT INTO users_table(
first_name,last_name,username,password,membership_status,admin)
VALUES
(
'Jean Luc',
'Picard',
'jeanluc@startrek.universe',
'20252025',
'member',
'TRUE'
)
ON CONFLICT (username) DO NOTHING;

CREATE TABLE IF NOT EXISTS messages(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(200),
timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
content VARCHAR(1000),
author_name VARCHAR(300),
author_id INTEGER NOT NULL,
FOREIGN KEY (author_id) REFERENCES users_table(id) ON DELETE CASCADE
);


INSERT INTO messages(title,content,author_name,author_id )
VALUES
(
'CASIO watches are the best',
'I find that CASIO watches are durable and accurate and as a StarShip captain who travels to different planets I find them to be awesome !',
'Jean Luc',
1
);`;

async function main() {
  console.log("Seeding data to database....");

  const client = new Client({
    connectionString: `${process.env.URI_LOCAL_MACHINE}`,
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
