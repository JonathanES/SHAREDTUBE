/**
 * package installed
 */
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');

/**
 * instantiation of the packages/files used
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/**
 * instantiation of socket.io
 */
require('./socket-handler/handler.js')(io);
/*io.on('connection', function (client) {
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
          client.emit('timer', new Date());
        }, interval);
      });
  });*/
/**
 * for http
 */
console.log("server running on localhost:8080");
server.listen(8080);
module.exports = io;