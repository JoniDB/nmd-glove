import { EventEmitter } from 'events';
import Socket from 'socket.io-client';
import {SOCKET_SERVER_URL} from './config.js';

/**
// TODO
 *
 * this is ACTUALLY a CONTAINER
 */

class Connection extends EventEmitter {

  constructor() {
    super();
    this._socket = new Socket(SOCKET_SERVER_URL);
    console.log(`Connecting socket to '${SOCKET_SERVER_URL}'`);
    this._retryMSec = 5000;

    //Setup connection
    this._socket.on('connect', () => {
      console.log('connected')
    });

    this._socket.on('disconnect', () => {
      console.log('Disconnected from the log-event socketApi server');
      setTimeout(() => { this._socket = new Socket(SOCKET_SERVER_URL); }, this._retryMSec);
    });

    this._socket.on('connect_error', (err) => {
      console.error(`Error while connecting with the socket server at ${SOCKET_SERVER_URL}`, err);
      setTimeout(() => { this._socket = new Socket(SOCKET_SERVER_URL); }, this._retryMSec);
    });

    // Receiving events
    this._socket.on('heartRate', (data) => {
      this.emit('UPDATE_HEARTRATE', data);
    });

    // Receiving events
    this._socket.on('light', (data) => {
      this.emit('UPDATE_LIGHT', data);
    });
  }

  updateHeartrate(value) {
    console.log('updated in socket')
    this._socket.emit('heartRate', value);
  }

}

export default Connection;
