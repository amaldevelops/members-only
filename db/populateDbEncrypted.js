#! /usr/bin/env node

const { Client } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const users = [
  {
    first_name: "Jean Luc",
    last_name: "Picard",
    username: "jeanluc@startrek.universe",
    password: "ExploreTheUniverse2025",
    membership_status: true,
    admin: true,
  },
  {
    first_name: "William",
    last_name: "Riker",
    username: "williamr@startrek.universe",
    password: "LifeIsForLiving2025",
    membership_status: true,
    admin: true,
  },
  {
    first_name: "Geordi",
    last_name: "La Forge",
    username: "gerodi@startrek.universe",
    password: "IwantToSee2025",
    membership_status: true,
    admin: true,
  },
  {
    first_name: "Data",
    last_name: "",
    username: "data@startrek.universe",
    password: "IwantToBeHuman2025",
    membership_status: true,
    admin: true,
  },
  {
    first_name: "Worf",
    last_name: "",
    username: "worf@startrek.universe",
    password: "IamKlingon2025",
    membership_status: true,
    admin: false,
  },
  {
    first_name: "Q",
    last_name: "",
    username: "q@qcontinuum.com",
    password: "qIsAwesome3000",
    membership_status: false,
    admin: false,
  },
];

const messages = [
  {
    title: "CASIO watches are the best",
    content:
      "I find that CASIO watches are durable and accurate and as a StarShip captain who travels to different planets I find them to be awesome !",
    author_id: 1,
  },
  {
    title: "Jean Luc you are been tested",
    content:
      "Q Continuum is Keeping an eye on human race and you have to prove you are worthy to exist !",
    author_id: 6,
  },
  {
    title: "Q You are not welcome in this club, please leave",
    content:
      "Q You are not welcome in this club, please leave, Worf make sure Q is expelled from the forum!",
    author_id: 1,
  },
  // Add more messages as needed
];

async function main() {
  console.log("Seeding data to database....");

  const client = new Client({
    connectionString: `${process.env.URI_LOCAL_MACHINE}`,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  // Create tables
  const createTablesSQL = `
CREATE TABLE IF NOT EXISTS users_table (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(300),
  username VARCHAR(300) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  membership_status BOOLEAN DEFAULT FALSE,
  admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  author_id INTEGER NOT NULL,
  title VARCHAR(200),
  timestamp TIMESTAMP DEFAULT NOW(),
  content VARCHAR(1000),
  FOREIGN KEY (author_id) REFERENCES users_table(id) ON DELETE CASCADE
);
  `;
  await client.query(createTablesSQL);

  // Insert users with encrypted passwords
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userSQL = `
    INSERT INTO users_table (
      first_name, last_name, username, password, membership_status, admin
    ) VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (username) DO NOTHING;
    `;
    await client.query(userSQL, [
      user.first_name,
      user.last_name,
      user.username,
      hashedPassword,
      user.membership_status,
      user.admin,
    ]);
  }

  // Insert messages
  for (const message of messages) {
    const messageSQL = `
    INSERT INTO messages (title, content, author_id)
    VALUES ($1, $2, $3);
    `;
    await client.query(messageSQL, [
      message.title,
      message.content,
      message.author_id,
    ]);
  }

  await client.end();
  console.log("Database Populated successfully!");
}

main().catch((err) => {
  console.error("Error populating database:", err);
});
