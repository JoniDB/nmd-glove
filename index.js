const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Return them as json
  res.json({passwords:
    [
      'kdlkdlaksf',
      'alfksfkaslfk'
    ]
  });

  console.log(`Sent ${count} passwords`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port);

//Socket part
const io = socket(server);
io.sockets.on('connection', newConnection);

//all websocket functions
function newConnection(socket) {
  socket.on('heartRate', (data) => {
    io.emit('heartRate', data);
  })

  socket.on('flex', (data) => {
    io.emit('flex', data);
  })

  socket.on('accelerometer', (data) => {
    io.emit('accelerometer', data);
  })

  socket.on('randomOSC', (data) => {
    io.emit('randomOSC', data);
    console.log(data);
  });
};
//
console.log(`nmd-glove listening on ${port}`);
