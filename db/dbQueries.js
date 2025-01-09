const pool = require("./pool");

async function SQLUnauthorizedGetAllMessages() {
  const { rows } = await pool.query("SELECT title FROM messages");

  return rows;
}

module.exports = {
  SQLUnauthorizedGetAllMessages,
};
