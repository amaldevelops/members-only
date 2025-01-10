const pool = require("./pool");

async function SQLAuthenticateUser()
{
  try{}
  catch(error)
  {
    console.error("Error Saving message - Authorized state", error.message);
    throw error;
  }
}

async function SQLNewUserCreate()
{
  try{}

  catch(error)
  {
    console.error("Error Saving message - Authorized state", error.message);
    throw error;
  }
}

async function SQLUnauthorizedGetAllMessages() {
  try {
    const { rows } = await pool.query("SELECT timestamp,title,content FROM messages");

    return rows;
  } catch (error) {
    console.error(
      "Error Fetching messages - Unauthorized state",
      error.message
    );
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
    console.error("Error Fetching messages - Authorized state", error.message);
    throw error;
  }
}

async function SQLAuthorizedNewMessageSave(newMessage) {
  try {
    const query = `INSERT INTO messages(title,content,author_id)
      VALUES($1,$2,$3)`;
    // const message = [
    //   "CASIO AE-1500 is pretty awesome",
    //   "CASIO AE-1500 is pretty awesome",
    //   1,
    // ];
    console.log(newMessage)
    const message=[newMessage.title,newMessage.content,newMessage.author_id]

    const { rows } = await pool.query(query, message);
  } catch (error) {
    console.error("Error Saving message - Authorized state", error.message);
    throw error;
  }
}

async function SQLDeleteMessage()
{
  try{

  }

  catch (error) {
    console.error("Error Saving message - Authorized state", error.message);
    throw error;
  }
}

module.exports = {
  SQLAuthenticateUser,
  SQLNewUserCreate,
  SQLDeleteMessage,
  SQLUnauthorizedGetAllMessages,
  SQLAuthorizedGetAllMessages,
  SQLAuthorizedNewMessageSave,
 };
