const connectionPool = require("../config/dbConnection");

const createNewUser = async (user) => {
  return new Promise(async (resolve, reject) => {
    connectionPool.query(
      "insert into users values(?,?,?)",
      [user.userId, user.userName, user.userPassword],
      (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(`User '${user.userName}' has been saved succcessfully`);
      }
    );
  });
};

const isUserExists = (userName) => {
  return new Promise((resolve, reject) => {
    connectionPool.query(
      "select * from users where userName = ?",
      [userName],
      (error, result, fields) => {
        if (error) {
          reject(error);
        }
        if (result[0]) {
          resolve(result[0]);
        } else {
          resolve(null);
        }
      }
    );
  });
};



module.exports = { createNewUser, isUserExists };

/* const fsPromises = require("fs").promises;
const path = require("path");
const usersDB = {
  users: require("../data/users.json"),
  setUsers: function (users) {
    this.users = users;
  },
};

const createNewUser = async (user) => {
  return new Promise(async (resolve, reject) => {
    usersDB.setUsers([...usersDB.users, user]);
    try {
      await fsPromises.writeFile(
        path.join(__dirname, "../data/users.json"),
        JSON.stringify(usersDB.users)
      );
      resolve(`User '${user.userName}' has been saved succcessfully`);
    } catch (error) {
      reject(error);
    }
  });
};

const isUserExists = (userName) => {
  return new Promise((resolve, reject) => {
    try {
      const user = usersDB?.users?.find(
        (user) => user.userName === userName
      );
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createNewUser, isUserExists };
 */
