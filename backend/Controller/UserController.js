const client = require('../../config/database');
const crypto = require('crypto');

function searchUser(username){
    return new Promise(async(resolve) => {
        const query = {
            text: 'SELECT id_user, username FROM users WHERE username = $1',
            values: [username],
          }
          const result = await client.query(query).catch(err => console.log(err));
          resolve(result.rows); 
    })
}

function addFriend(id_user, id_friend){
    return new Promise(async(resolve) => {
    const query = {
        text: 'INSERT INTO FRIENDS(id_user, id_friend) VALUES($1,$2) RETURNING *',
        values: [id_user, id_friend],
      }
      const result = await client.query(query).catch(err => console.log(err));
      resolve(result.rows[0]);
    });
}

function getListOfFriends(id_user){
    return new Promise(async(resolve) => {
        const query = {
            text: 'SELECT id_friend, username FROM users INNER JOIN friends ON friends.id_user = users.id_user AND id_user = $1',
            values: [id_user],
          }
          const result = await client.query(query).catch(err => console.log(err));
          resolve(result.rows); 
    })
}

function getSingleUser(email, password){
    return new Promise(async (resolve) => {
        password = crypto.createHash('sha256').update(password).digest('base64');
        const check = await checkUserExistance(email, password);
        if (check){
            const query = {
                text: 'SELECT id_user, username FROM users WHERE email = $1 AND password = $2',
                values: [email, password],
              }
              const result = await client.query(query).catch(err => console.log(err));
              resolve(result.rows[0]); 
        }
    });
}

async function insertUser(email, username, password){
    return new Promise(async resolve => {
        password = crypto.createHash('sha256').update(password).digest('base64');
        const check = await checkUserExistance(email, password);
        if (check){
            const query = {
                text: 'INSERT INTO USERS(email,password,username) VALUES($1,$2,$3) RETURNING username, email, id_user',
                values: [email, password, username],
              }
              const result = await client.query(query).catch(err => console.log(err));
              resolve(result.rows[0]);
        }
        else {
            return "element exists already";
        }
    })
}

async function checkUserExistance(email, password){
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'SELECT EXISTS (SELECT 1 FROM users WHERE email = $1 AND password = $2)',
            values: [email, password],
          }
          try {
            const result = await client.query(query);
            resolve(result.rows[0]);
          } catch(err) {
            console.log(err.stack)
          }
    });
}

module.exports = {
    insertUser: insertUser,
    getSingleUser: getSingleUser,
    getListOfFriends: getListOfFriends,
    addFriend: addFriend,
    searchUser: searchUser
}