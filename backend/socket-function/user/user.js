const client = require('../../config/database');
const crypto = require('crypto');

function searchUser(id_user, username) {
    return new Promise(async (resolve) => {
        const query = {
            text: 'SELECT id_user, username FROM users WHERE id_user != $1 AND users_vectors @@ to_tsquery($2);',
            values: [id_user, username],
        }
        const result = await client.query(query).catch(err => console.log(err));
        const listOfFriends = await getListOfFriends(id_user);
        listOfFriends.forEach(elt => {
            const index = result.rows.findIndex(x => x.id_user === elt.id_user);
            if (index != -1)
                result.rows.splice(index, 1);
        })
        resolve(result.rows);
    })
}

function addFriend(id_user, id_friend) {
    return new Promise(async (resolve) => {
        const check = await checkIfFriends(id_user, id_friend);
        if (!check) {
            const query = {
                text: 'INSERT INTO FRIENDS(id_user, id_friend) VALUES($1,$2) RETURNING *',
                values: [id_user, id_friend],
            }
            const result = await client.query(query).catch(err => console.log(err));
            resolve(result.rows[0]);

        }
        else
            resolve('');
    });
}

function removeFriend(id_user, id_friend) {
    return new Promise(async (resolve) => {
        const check = await checkIfFriends(id_user, id_friend);
        if (check) {
            const query = {
                text: 'DELETE FROM FRIENDS WHERE id_user = $1 AND id_friend = $2',
                values: [id_user, id_friend],
            }
            const result = await client.query(query).catch(err => console.log(err));
            resolve(result.rows[0]);

        }
        else
            resolve('');
    });
}


function getListOfFriends(id_user) {
    return new Promise(async (resolve) => {
        const query = {
            text: 'select username, users.id_user from users INNER JOIN FRIENDS ON friends.id_user = $1 and friends.id_friend = users.id_user;',
            values: [id_user],
        }
        const result = await client.query(query).catch(err => console.log(err));
        resolve(result.rows);
    })
}

/*function getListOfFriendsNotGroup(id_user){
    return new Promise(async (resolve) => {
        const query = {
            text: 'SELECT username, users.id_user FROM USERS INNER JOIN USERS_GROUP',
            values: [id_user]
        }
        const result = await client.query(query).catch(err => console.log(err));
        resolve(result.rows);
    })
}*/

function getSingleUser(email, password) {
    return new Promise(async (resolve) => {
        password = crypto.createHash('sha256').update(password).digest('base64');
        const check = await checkUserExistance(email, password);
        if (check) {
            const query = {
                text: 'SELECT id_user, username FROM users WHERE email = $1 AND password = $2',
                values: [email, password],
            }
            const result = await client.query(query).catch(err => console.log(err));
            resolve(result.rows[0]);
        }
    });
}

async function insertUser(email, username, password) {
    return new Promise(async resolve => {
        password = crypto.createHash('sha256').update(password).digest('base64');
        const check = await checkUserExistance(email, password);
        if (check) {
            const query = {
                text: 'INSERT INTO USERS(email,password,username,users_vectors) VALUES($1,$2,$3,to_tsvector($4)) RETURNING username, email, id_user',
                values: [email, password, username, username],
            }
            const result = await client.query(query).catch(err => console.log(err));
            resolve(result.rows[0]);
        }
        else {
            return "element exists already";
        }
    })
}

async function checkUserExistance(email, password) {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'SELECT EXISTS (SELECT 1 FROM users WHERE email = $1 AND password = $2)',
            values: [email, password],
        }
        try {
            const result = await client.query(query);
            resolve(result.rows[0]);
        } catch (err) {
            console.log(err.stack)
        }
    });
}

async function checkIfFriends(id_user, id_friend) {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'SELECT EXISTS (SELECT 1 FROM friends WHERE id_user = $1 AND id_friend = $2)',
            values: [id_user, id_friend],
        }
        try {
            const result = await client.query(query);
            resolve(result.rows[0].exists);
        } catch (err) {
            console.log(err.stack)
        }
    });
}

module.exports = {
    insertUser: insertUser,
    getSingleUser: getSingleUser,
    getListOfFriends: getListOfFriends,
    addFriend: addFriend,
    removeFriend: removeFriend,
    searchUser: searchUser
}