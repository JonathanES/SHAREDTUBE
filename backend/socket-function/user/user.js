const client = require('../../config/database');
const crypto = require('crypto');

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
            /*res.status(409).json({
                message: "conflict",
                result: "element exists already in database"
            });*/
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
    getSingleUser: getSingleUser
}