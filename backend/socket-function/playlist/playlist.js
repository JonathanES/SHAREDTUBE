const client = require('../../config/database');
const crypto = require('crypto');

function getAllPlaylistGroups(id_group) {
    return new Promise(async (resolve) => {
        const query = {
            text: 'SELECT name, id_playlist FROM PLAYLIST INNER JOIN GROUP_PLAYLIST ON GROYP_PLAYLIST.id_playlist = PLAYLIST.id_playlist AND id_group = $1',
            values: [id_group],
        }
        const result = await client.query(query).catch(err => console.log(err));
        resolve(result.rows[0]);
    });
}

function getAllPlaylistUser(id_user) {
    return new Promise(async (resolve) => {
        const query = {
            text: 'SELECT PLAYLIST.id_playlist, name FROM PLAYLIST INNER JOIN USERS_PLAYLIST ON USERS_PLAYLIST.id_playlist = PLAYLIST.id_playlist AND id_user = $1',
            values: [id_user],
        }
        const result = await client.query(query).catch(err => console.log(err));
        if (result.rowCount === 0)
            resolve([]);
        else
            resolve(result.rows);
    });
}

function getAllVideosFromPlaylist(id_playlist) {
    return new Promise(async (resolve) => {
        const query = {
            text: 'SELECT name, url, thumbnails FROM videos INNER JOIN VIDEO_PLAYLIST ON VIDEO_PLAYLIST.id_video = VIDEO.id_video AND id_playlist = $1',
            values: [id_playlist],
        }
        const result = await client.query(query).catch(err => console.log(err));
        resolve(result.rows[0]);
    });
}
/**
 * insert the video selected in the table video
 * insert the video to the bridge table between the video and the playlist
 * @param {*} video 
 * @param {*} id_playlist 
 */
async function insertVideoInPlaylist(video, id_playlist) {
    return new Promise(async resolve => {
        const check = await checkVideo(video.id);
        if (!check) {
            const videoQuery = {
                text: 'INSERT INTO VIDEOS(id_video, name, thumbnail) VALUES($1,$2, $3) RETURNING id_video',
                values: [video.id, video.titles, video.url]
            }
            await client.query(videoQuery).catch(err => console.log(err));
        }
        const playlistQuery = {
            text: 'INSERT INTO VIDEO_PLAYLIST(id_video, id_playlist) VALUES($1,$2) RETURNING id_video',
            values: [video.id, id_playlist]
        }
        const playlistResult = await client.query(playlistQuery).catch(err => console.log(err));
        resolve(playlistResult.rows[0]);
    })
}

async function removeVideoInPlaylist(id_video, id_playlist) {
    return new Promise(async resolve => {
        const query = {
            text: 'DELETE FROM VIDEO_PLAYLIST WHERE id_video = $1 AND id_playlist = $2',
            values: [id_video, id_playlist]
        }
        const result = await client.query(query).catch(err => console.log(err));
        resolve(result.rowCount);
    })
}

function checkVideoInListPlaylist(id_video, id_playlist) {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'SELECT EXISTS (SELECT 1 FROM VIDEO_PLAYLIST WHERE id_video = $1 AND id_playlist = $2)',
            values: [id_video, id_playlist],
        }
        try {
            const result = await client.query(query);
            resolve(result.rows[0].exists);
        } catch (err) {
            console.log(err.stack)
        }
    });
}

function checkVideo(id_video) {
    return new Promise(async (resolve, reject) => {
        const query = {
            text: 'SELECT EXISTS (SELECT 1 FROM VIDEOS WHERE id_video = $1)',
            values: [id_video],
        }
        try {
            const result = await client.query(query);
            resolve(result.rows[0].exists);
        } catch (err) {
            console.log(err.stack)
        }
    });
}

async function createPlaylist(name) {
    return new Promise(async resolve => {
        const query = {
            text: 'INSERT INTO PLAYLIST(name) VALUES($1) RETURNING id_playlist, name',
            values: [name]
        }
        const result = await client.query(query).catch(err => console.log(err));
        resolve(result.rows[0]);

    })
}

module.exports = {
    createPlaylist: createPlaylist,
    insertVideoInPlaylist: insertVideoInPlaylist,
    getAllVideosFromPlaylist: getAllVideosFromPlaylist,
    getAllPlaylistUser: getAllPlaylistUser,
    getAllPlaylistGroups: getAllPlaylistGroups,
    checkVideoInListPlaylist: checkVideoInListPlaylist,
    removeVideoInPlaylist: removeVideoInPlaylist
}