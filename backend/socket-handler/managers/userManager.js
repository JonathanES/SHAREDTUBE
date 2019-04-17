const user = require('../../socket-function/user/user');
const ChatroomController = require('../../Controller/ChatroomController');
module.exports = function (io) {
    /**
 * instantiation of socket.io
 */
    io.on('connection', client => {
        client.on('USER_LOGIN', async (email, password) => {
            const result = await user.getSingleUser(email, password);
            console.log(result.username + " is connected");
            ChatroomController.getChatroomList(result.id_user);
            client.emit('LOGIN', result);
        });

        client.on('USER_INSCRIPTION', async (username, email, password) => {
            const result = await user.insertUser(email, username, password);
            client.emit('INSCRIPTION', result);
        });

        client.on('USER_SEARCH_FRIEND', async (id_user, username) => {
            const result = await user.searchUser(id_user, username);
            client.emit('SEARCH_FRIEND', result);
        });

        client.on('USER_LIST_OF_FRIENDS', async (id_user) => {
            const result = await user.getListOfFriends(id_user);
            client.emit('LIST_OF_FRIENDS', result);
        });

        client.on('USER_ADD_FRIEND', async (id_user, id_friend) => {
            const result = await user.addFriend(id_user, id_friend);
            client.emit('ADD_FRIEND', result);
        });

        client.on('USER_REMOVE_FRIEND', async (id_user, id_friend) => {
            const result = await user.removeFriend(id_user, id_friend);
            client.emit('REMOVE_FRIEND', result);
        });

        client.on('USER_FIND_FRIENDS_NOT_IN_GROUP', async(id_group, id_user) => {
            const result = await user.getListOfFriendsNotInGroup(id_group, id_user);
            client.emit('FIND_FRIENDS_NOT_IN_GROUP', result);
        })
    });
};