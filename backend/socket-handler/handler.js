module.exports = function (io) {
    require('./managers/userManager')(io);
    require('./managers/videoManager')(io);
}