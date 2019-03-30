const video = require('../../socket-function/video');
module.exports = function (io) {
    /**
 * instantiation of socket.io
 */
    io.on('connection', client => {
        client.on('VIDEO_THUMBNAILS', async (name) => {
            const result = await video.getVideos(name);
            client.emit('THUMBNAILS', result);
        });
    });
};