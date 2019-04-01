const playlist = require('../../socket-function/playlist/playlist');
module.exports = function (io) {
    /**
 * instantiation of socket.io
 */
    io.on('connection', client => {
        client.on('CREATE_PLAYLIST', async (name) => {
            const result = await playlist.createPlaylist(name);
            client.emit('CREATION', result);
        });
        client.on('INSERT_VIDEO_IN_PLAYLIST', async (video, id_playlist) => {
            const result = await playlist.insertVideoInPlaylist(video, id_playlist);
            client.emit('INSERT_VIDEO', result);
        });

        client.on('GET_ALL_VIDEOS', async (id_playlist) => {
            const result = await playlist.getAllVideosFromPlaylist(id_playlist);
            client.emit('ALL_VIDEOS', result);
        });

        client.on('GET_PLAYLIST_GROUP', async (id_group) => {
            const result = await playlist.getAllPlaylistGroups(id_group);
            client.emit('PLAYLIST_GROUP', result);
        });

        client.on('GET_PLAYLIST_USER', async (id_user) => {
            const result = await playlist.getAllPlaylistUser(id_user);
            client.emit('PLAYLIST_USER', result);
        });

        client.on('CHECK_VIDEO_PLAYLIST', async(id_video, id_playlist) => {
            const result = await playlist.checkVideoInListPlaylist(id_video, id_playlist);
            client.emit('CHECK_PLAYLIST', result);
        })

        client.on('REMOVE_VIDEO_PLAYLIST', async(id_video, id_playlist) => {
            const result = await playlist.removeVideoInPlaylist(id_video, id_playlist);
            client.emit('REMOVE_VIDEO_FROM_PLAYLIST', result);
        })
    });
};