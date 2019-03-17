const fs = require('fs');
const axios = require('axios');
const config = require('../config/config');
const { google } = require('googleapis'),
    youtubeV3 = google.youtube({ version: 'v3', auth: config.youtube_key });
const ytdl = require('ytdl-core');
const path = require('path');

const BASE_URL = config.base_url;
const OPTIONS = config.options;

function requestVideosPlaylist(arrayOfVideos, playlistId, pageToken) {
    return new Promise((resolve, reject) => {
        OPTIONS.playlistId = playlistId;
        if (pageToken)
            OPTIONS.pageToken = pageToken;
        youtubeV3.playlistItems.list(OPTIONS, async (err, response) => {
            const result = response.data;
            result.items = result.items.map(videos => { return { title: videos.snippet.title.replace(/[^\w\s]/gi, ''), thumbnails: videos.snippet.thumbnails.default, url: BASE_URL + videos.contentDetails.videoId } });
            arrayOfVideos = arrayOfVideos.concat(result.items);
            if (result.nextPageToken)
                resolve(requestVideosPlaylist(arrayOfVideos, playlistId, result.nextPageToken));
            else
                resolve(arrayOfVideos);
        });
    });
}

async function getVideosOfPlayList() {
    const playlistId = 'PLLQOfiSK-o2c-HGuTRYZaygJw0El4POEu' //req.body.playlistId;
    let arrayOfVideos = [];
    arrayOfVideos = await requestVideosPlaylist(arrayOfVideos, playlistId);
    let count = 0;
    arrayOfVideos.forEach(video => {
        try {
            //const file = fs.createWriteStream(__dirname + '/../result-mp3/' + video.title + '.');
            ytdl(video.url, {filter: 'audioonly'}).on('error', (err) => console.log(err)).pipe(fs.createWriteStream(__dirname + '/../result-mp3/' + video.title + '.mp3'));


            //ytdl(video.url).on('error', (err) => console.log(err)).pipe(__dirname + '/../result-mp3/' + video.title + '.flv');
    
        } catch (error) {
            console.log(error);
        }
       
    });
   /* arrayOfVideos.forEach(video => {
        ytdl(video.url).on('error', (err) => console.log(err)).pipe('./backend/result-mp3/' + video.title + '.flv');
    })*/
}


getVideosOfPlayList();
function getVideos(req, res, next) {
    const name = req.params.name;
    youtubeV3.search.list({
        part: 'snippet',
        type: 'video',
        q: name,
        maxResults: 10,
        safeSearch: 'moderate',
        videoEmbeddable: true
    }, (err, response) => {
        let thumbnails = [];
        for (var elt in response.data.items) {
            const item = response.data.items[elt];
            thumbnails.push({
                id: item.id.videoId,
                url: item.snippet.thumbnails.high.url,
                titles: item.snippet.title
            });
        }
        res.json(thumbnails);
    });
}

module.exports = {
    getVideos: getVideos
};