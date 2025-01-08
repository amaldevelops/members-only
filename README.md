# NodeJs-MembersOnly

An exclusive Membership site where members can post anonymous messages. Non-members can view the posts without knowing the authors, while members and admins enjoy special privileges. Built using **Node.js**, **Express**, **Passport.js**, and **PostgreSQL**.

---

## 🚀 Live Version

Deployed on:

- **Koyeb PaaS**: [Live Demo](#)

---

## Source Code

```
   https://github.com/1Amal/NodeJs-MembersOnly
```

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Authentication**: Passport.js
- **Database**: PostgreSQL
- **Password Security**: bcrypt.js
- **Deployment**: Koyeb

---

## 📊 Database Design

### 1. **User Table**
Stores user information for authentication and authorization.

| Column Name         | Data Type | Description                         |
|---------------------|-----------|-------------------------------------|
| `id`                | SERIAL    | Primary key. Auto-incremented ID.   |
| `first_name`        | TEXT      | User's first name.                 |
| `last_name`         | TEXT      | User's last name.                  |
| `username`          | TEXT      | Unique username or email.          |
| `password`          | TEXT      | Hashed password using bcrypt.      |
| `membership_status` | BOOLEAN   | `true` if the user is a member.    |
| `admin`             | BOOLEAN   | `true` if the user is an admin.    |

---

### 2. **Message Table**
Stores messages created by users.

| Column Name  | Data Type | Description                          |
|--------------|-----------|--------------------------------------|
| `id`         | SERIAL    | Primary key. Auto-incremented ID.    |
| `title`      | TEXT      | Title of the message.               |
| `timestamp`  | TIMESTAMP | Time the message was created.       |
| `content`    | TEXT      | Message content.                    |
| `author_id`  | INTEGER   | References the `id` in the User table. |

---

## 🔑 Features

1. **Authentication and Authorization**:
   - **Sign-Up Form**:
     - Users sign up with a username, password, and confirm password.
     - Passwords are hashed with `bcrypt` for security.
   - **Login Form**:
     - Built with Passport.js for secure authentication.
   - **Membership Access**:
     - Users must enter a secret passcode to gain membership.

2. **Anonymous Posting**:
   - Non-members see messages without the author's name.
   - Members see the author's name and the timestamp.

3. **Message Management**:
   - Members can create new messages.
   - Admins can delete messages.

4. **Admin Privileges**:
   - Admins can manage all messages and users.
   - Admin status is assigned via a secret passcode or checkbox during signup.

5. **Custom Middleware**:
   - Provides user-specific views and functionality based on roles.

---

## 🔧 Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:1Amal/NodeJs-MembersOnly.git
   cd clubhouse-message-board

Install Dependencies:

```
npm install
```

```
NODE_ENV=production
DB_HOST=localhost
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=clubhouse
DB_PORT=5432
SECRET=your-passport-secret
```

Start the Server:

```
npm start
```

📜 License
This project is licensed under the GPL V3.0 License.