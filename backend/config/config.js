const config = {};

config.youtube_key = 'AIzaSyA_y07l0mj5--7sojP6ZQrHTwh31jOo4y0';
config.base_url = 'https://www.youtube.com/watch?v=';
config.options = {
    'maxResults': '50',
    'part': 'contentDetails, snippet'
};
config.search_options = {
    part: 'snippet',
    type: 'video',
    maxResults: 10,
    safeSearch: 'moderate',
    videoEmbeddable: true
};

module.exports = config;