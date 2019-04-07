const ChatroomController = require('../../Controller/ChatroomController');
module.exports = function (io) {
    /**
 * instantiation of socket.io
 */
    io.on('connection', client => {
        client.on('USER_CREATE_GROUP', async(name, id_user) => {
            const result = await ChatroomController.addChatroom(name, id_user);
            client.emit('CREATE_GROUP', result);
        });

        client.on('USER_GET_GROUP', async(id_user) => {
            let chatroomList = await ChatroomController.getChatroomList(id_user);
            chatroomList = chatroomList.map(elt => {return {id_group: elt.getIdGroup, name: elt.getName}});
            client.emit('GET_GROUP', chatroomList);
        });

        client.on('USER_ADD_FRIEND_GROUP', async(id_user, id_group) => {
            const result = await ChatroomController.addUserInChatroom(id_user, id_group);
            client.emit('ADD_FRIEND_GROUP', result);
        });

        client.on('USER_SEND_MESSAGE', async (id_group, username, message) => {
            const result = await ChatroomController.setChatHistory(id_group, username, message);
            client.emit('SEND_MESSAGE', result);
        })

        client.on('USER_GET_MESSAGE', async (id_user, id_group) => {
            const result = await ChatroomController.getChatHistory(id_user, id_group);
            client.emit('GET_MESSAGE', result);
        })
    });
};