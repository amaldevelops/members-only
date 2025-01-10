const pool = require("./pool");

async function SQLUnauthorizedGetAllMessages() {
  try {
    const { rows } = await pool.query("SELECT title FROM messages");

    return rows;
  } catch (error) {
    console.error("Error Fetching messages Unauthorized state", error.message);
    throw error;
  }
}

async function SQLAuthorizedGetAllMessages() {
  try {
    const { rows } = await pool.query(
      "SELECT users_table.first_name,messages.title,messages.content FROM users_table INNER JOIN messages ON users_table.id = messages.author_id;"
    );
    return rows;
  } catch (error) {
    console.error("Error Fetching messages authorized state", error.message);
    throw error;
  }
}

module.exports = {
  SQLUnauthorizedGetAllMessages,
  SQLAuthorizedGetAllMessages,
};
