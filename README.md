# NMD Glove

This is the repository for my personal NMD project.
it includes the backend and a frontend client with a dashboard.



The backend is a Node.js app using Express, OSC, Socket.io and MQTT.

The frontend is a simple React app, using socket.io-client for the connection and d3.v4.js for the dashboard.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/JoniDB/nmd-glove.git 
cd nmd-glove
npm install
npm run build-client
npm start
```

Your app should now be running on [localhost:3001](http://localhost:3001/).

## Editing the client

When you have the complete repository running as instructed above, but you want to edit the client without rebuilding everytime, you can run the client on it's own with live updates.

```
cd client
npm start
```

You can check live changes on [localhost:3000](http://localhost:3001/).

## Documentation

more documentation in the main repository
