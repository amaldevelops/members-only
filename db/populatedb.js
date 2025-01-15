#! /usr/bin/env node

const { Client } = require("pg");

require("dotenv").config();

const bcrypt = require("bcryptjs");

await bcrypt.hash(password, 10);

const SQL = `
CREATE TABLE IF NOT EXISTS users_table(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name VARCHAR(100),
last_name VARCHAR(300),
username VARCHAR(300) UNIQUE NOT NULL,
password VARCHAR(100) NOT NULL,
membership_status BOOLEAN DEFAULT FALSE,
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
'TRUE',
'TRUE'
),
(
'William',
'Riker',
'williamr@startrek.universe',
'Alaska',
'TRUE',
'TRUE'
),
(
'Geordi',
'La Forge',
'gerodi@startrek.universe',
'wiser2025',
'TRUE',
'TRUE'
),
(
'Data',
'',
'data@startrek.universe',
'20252025',
'TRUE',
'TRUE'

),
(
'Worf',
'',
'worf@startrek.universe',
'IamKlingon',
'TRUE',
'FALSE'
),
(
'Q',
'',
'q@qcontinuum.q',
'qIsAwesome',
'FALSE',
'FALSE'
)

ON CONFLICT (username) DO NOTHING;

CREATE TABLE IF NOT EXISTS messages(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
author_id INTEGER NOT NULL,
title VARCHAR(200),
timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
content VARCHAR(1000),
FOREIGN KEY (author_id) REFERENCES users_table(id) ON DELETE CASCADE
);


INSERT INTO messages(title,content,author_id )
VALUES
(
'CASIO watches are the best',
'I find that CASIO watches are durable and accurate and as a StarShip captain who travels to different planets I find them to be awesome !',
1
),
(
'Jean Luc you are been tested',
'Q Continuum is Keeping an eye on human race and you have to prove you are worthy to exist !',
6
),
(
'Q You are not welcome in this club, please leave',
'Q You are not welcome in this club, please leave, Worf make sure Q is expelled from the forum!',
1
),
(
'Yes Captain, I will take care of this security breach',
'Yes Captain, I will take care of this security breach',
5
),
(
'I don''t understand why people spend millions on Patek Philippe watches?',
'I don''t understand why people spend millions on Patek Philippe watches, they are only able to tell time and not as accurate as Casios',
4
),
(
'PP watches are bought by people in the 21st century to show wealth !',
'PP watches are bought by people in the 21st century to show wealth and they are mostly used for store of value, they are normally not used as daily watches !',
3
),
(
'My dad gave me his PP watch as a heirloom but I use a Casio watch for daily wear',
'My dad gave me his PP watch as a heirloom but I use a Casio watch for daily wear. For me Casio watches are the most practical, cost effective, accurate watches ever built by humans !',
2
),
(
'Humans are stupid, Q don''t need watches to tell the time!',
'Humans are stupid, Q don''t need watches to tell the time, Q are limitless and timeless, humans are been tested by Q!',
6
),
(
'Captain seeking permission to Drop the table and rebuild it so Q losses access to the Forum',
'Captain seeking permission to Drop the table and rebuild it so Q losses access to the Forum',
3
),
(
'Geordie, Proceed with you plan, Goodbye Q!',
'Geordie, Proceed with you plan, Goodbye Q!',
1);`;

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
