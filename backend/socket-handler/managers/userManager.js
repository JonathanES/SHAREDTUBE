const user = require('../../socket-function/user/user');
module.exports = function (io) {
    /**
 * instantiation of socket.io
 */
    io.on('connection', client => {
        client.on('USER_LOGIN', async (email, password) => {
            const result = await user.getSingleUser(email, password);
            client.emit('LOGIN', result);
        });

        client.on('USER_INSCRIPTION', async (username, email, password) => {
            const result = await user.insertUser(email, username, password);
            client.emit('INSCRIPTION', result);
        });
    });
};