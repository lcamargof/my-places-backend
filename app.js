const Hapi = require('hapi');
const socketio = require('socket.io');

const server = Hapi.server({
  port: process.env.PORT || 5001,
  routes: { cors: true }
});

// Start socket.io
const io = socketio.listen(server.listener);

io.on('connection', () => {
  console.log("connection established");
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

// App routes
server.route(require('./routes')(io));

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();