const pool = require("./pool");

async function SQLAuthenticateUser(authenticationData) {
  try {
    const query="SELECT users_table.username, users_table.password FROM users_table WHERE users_table.username=$1 AND users_table.password=$2"

    const userNamePassword=[authenticationData.username,authenticationData.password]

    const {rows} = await pool.query(query,userNamePassword);

    if (rows.length>0)
    {
      return{
        success:true,
        message:"Authentication Successful",
        user:rows[0]
      };

    }
    else{
      return{
        success:false,
        message:"Authentication Failure"
      };
    };

  } catch (error) {
    console.error("Error Authenticating user - Unauthorized state", error.message);
    throw error;
  }
}

async function SQLNewUserCreate(newUserData) {
  try {
    const query = `INSERT INTO users_table (first_name,last_name,username,password,membership_status,admin) VALUES($1,$2,$3,$4,$5,$6);`;

    const createUserData = [
      newUserData.first_name,
      newUserData.last_name,
      newUserData.username,
      newUserData.password,
      newUserData.membership_status,
      newUserData.admin,
    ];

    const { rows } = await pool.query(query, createUserData);
  } catch (error) {
    console.error("Error Saving message - Authorized state", error.message);
    throw error;
  }
}

async function SQLUnauthorizedGetAllMessages() {
  try {
    const { rows } = await pool.query(
      "SELECT timestamp,title,content FROM messages"
    );

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
      "SELECT users_table.first_name,users_table.admin, messages.timestamp,messages.title,messages.content FROM users_table INNER JOIN messages ON users_table.id = messages.author_id;"
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
    console.log(newMessage);
    const message = [
      newMessage.title,
      newMessage.content,
      newMessage.author_id,
    ];

    const { rows } = await pool.query(query, message);
  } catch (error) {
    console.error("Error Saving message - Authorized state", error.message);
    throw error;
  }
}

async function SQLDeleteMessage() {
  try {
  } catch (error) {
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
