const client = require('../config/database');
const Chatroom = require('../Model/Chatroom');
const listOfChatrooms = [];
/**
 * function to create a new chatroom/group
 * insert the new group in the table groups
 * insert in the bridge table of the user and the group
 * @param {*} name of the group
 * @param {*} id_user of the user that created this group
 */
async function addChatroom(name, id_user) {
    return new Promise(async resolve => {
        const groupQuery = {
            text: 'INSERT INTO GROUPS(name) VALUES($1) RETURNING *;',
            values: [name],
        }

        let groupResult = await client.query(groupQuery);
        const userGroupQuery = {
            text: 'INSERT INTO USERS_GROUP VALUES($1,$2) RETURNING *;',
            values: [id_user, groupResult.rows[0].id_group]
        }
        const result = await client.query(userGroupQuery);
        resolve(result.rows[0])
    });
}


/**
 * return a list of the chatrooms that the user is linked to
 * @param {*} id_user 
 */
async function getChatroomList(id_user) {
    return new Promise(async resolve => {
        const query = {
            text: 'SELECT GROUPS.id_group, name FROM GROUPS INNER JOIN USERS_GROUP ON GROUPS.id_group = USERS_GROUP.id_group AND USERS_GROUP.id_user = $1',
            values: [id_user],
        }
        let list = await client.query(query);
        list = list.rows.map(elt => {
            elt = new Chatroom(elt.id_group, elt.name);
            return elt;
        });
        //
        list.forEach(singleChatroom => {
            if (!listOfChatrooms.some(chatroom => chatroom.getIdGroup === singleChatroom.getIdGroup)) 
                listOfChatrooms.push(singleChatroom);
        })      
        resolve(list);
    })
}

/**
 * get all the chat history of a group
 * @param {*} id_group 
 */
function getChatHistory(id_user, id_group) {
    return new Promise(async resolve => {
        const chatroom = listOfChatrooms.find(elt => elt.getIdGroup === id_group)
        resolve(chatroom.getChatHistory());
    });
}

/**
 * set the chat history 
 * @param {*} id_group 
 * @param {*} username 
 * @param {*} message 
 */

function setChatHistory(id_group, username, message) {
    return new Promise(async resolve => {
         const chatroom = listOfChatrooms.find(elt => elt.getIdGroup === id_group)
        const history = chatroom.getChatroomHistory;
        history.push({ username, message });
        chatroom.setChatroomHistory = history;
        listOfChatrooms.forEach(elt => {
            if (elt.getIdGroup === id_group)
                elt = chatroom; 
        })
        resolve(chatroom.getChatroomHistory);
    })
}

async function getFriendsNotInChatroom(id_group) {
    return new Promise(async resolve => {
        const query = {
            text: 'SELECT users.id_user, username FROM users INNER JOIN USERS_GROUP ON users_group.id_user = users.id_user AND id_group = $1',
            values: [id_group],
        }
        let list = await client.query(query);
        resolve(list);
    });
}

function addUserInChatroom(id_user, id_group) {
    return new Promise(async resolve => {
        const query = {
            text: 'INSERT INTO USERS_GROUP(id_user,id_group) VALUES($1,$2) RETURNING *;',
            values: [id_user, id_group],
        }
        const result = await client.query(query);
        resolve(result.rows[0]);
    });
}

module.exports = {
    addChatroom: addChatroom,
    getChatroomList: getChatroomList,
    getChatHistory: getChatHistory,
    setChatHistory: setChatHistory,
    addUserInChatroom: addUserInChatroom
}