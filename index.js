const express = require('express');
const osc = require('osc');
const path = require('path');
const socket = require('socket.io');
const mqtt = require('mqtt');

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
const server = app.listen(port);

//UDP
const sendPort = 3334;
const listenPort = 3333;
const ip = "127.0.0.1"

var udpPort = new osc.UDPPort({
  localAddress: ip,
  localPort: listenPort
});

udpPort.on("message", function (osc) {
  console.log("An OSC message was received!", osc);
  if(osc.topic == '/nmd/status') {
    console.log('status update')
  }
});

udpPort.on("error", function (err) {
  console.log(err);
});

udpPort.open();

//Socket
const io = socket(5000);
io.sockets.on('connection', newConnection);

//all websocket functions
function newConnection(socket) {
  console.log('new connection', socket);
  socket.on('heartRate', (data) => {
    io.emit('heartRate', data);
    console.log('heartrate triggged')
    udpPort.send({
      address: "/heartRate",
      args: [data]
    }, ip, sendPort);
  })

  socket.on('light', (data) => {
    io.emit('light', data);
    console.log('light triggged')
    udpPort.send({
      address: "/light",
      args: [data]
    }, ip, sendPort);
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

//MQTT
const url = "http://m20.cloudmqtt.com";
const options = {
  port: '11732',
  username: 'wqdmisbg',
  password: 'BmpJyW7W2Tz-'
};

const mqttClient = mqtt.connect(url, options);

mqttClient.on('connect', () => {
  console.log('connected to mqtt broker');
  mqttClient.subscribe('wqdmisbg/nmd/heartratePub');
  mqttClient.subscribe('wqdmisbg/nmd/lightPub');
})

mqttClient.on('message', (topic, message) => {
  if(topic === 'wqdmisbg/nmd/heartratePub') {
    console.log('heartRate update through mqtt', message.toString());
    io.emit('heartRate', message.toString());
    udpPort.send({
      address: "/heartRate",
      args: [message.toString()]
    }, ip, sendPort);
  } else if(topic === 'wqdmisbg/nmd/lightPub') {
    console.log('light update through mqtt', message.toString());
    io.emit('light', message.toString());
    udpPort.send({
      address: "/light",
      args: [message.toString()]
    }, ip, sendPort);
  }
})
//
console.log(`nmd-glove listening on ${port}`);
