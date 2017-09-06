import React, { Component } from 'react';
import BarChart from './BarChart';
import Connection from './Connection';
import DonutChart from './DonutChart';
import './App.css';

class App extends Component {
  // Initialize state
  constructor() {
    super();
    this.state = {
      accelerometerX: 0.58,
      accelerometerY: 0.2,
      accelerometerZ: -0.58,
      passwords: [],
      heartrate: 0,
      flex: 0.4,
      light: 0
    }
    this._connection = new Connection();
    this.updateHeartrate = this.updateHeartrate.bind(this);

    //Listen to Connection.emit
    const _this = this;
    this._connection.on('UPDATE_HEARTRATE', (data) => {
      _this.setState({heartrate: parseInt(data)})
    });

    this._connection.on('UPDATE_LIGHT', (data) => {
      _this.setState({light: parseInt(data)})
    });
  }

  updateHeartrate = () => {
    this._connection.updateHeartrate(78);
  }

  render() {
    const { accelerometerX, accelerometerY, accelerometerZ, passwords, heartrate, light } = this.state;

    return (
      <div className="App">
          <div>
            <h1>NMD Glove</h1>
            <button
              className="more"
              onClick={this.updateHeartrate}>
              Update heartrate?
            </button>
          </div>
        <div className="chart">
          <svg width={"200"} height="200">
            <DonutChart height={200} totalCount={1024} width={200} value={heartrate}/>
          </svg>
          <h5>heartbeat</h5>
          <h2>{heartrate}</h2>
        </div>
        <div className="chart">
          <svg width={"200"} height="200">
            <BarChart height={200} totalCount={1024} width={200} values={[-0.58, 0.6, 0.8]}/>
          </svg>
          <h5>accelerometer</h5>
          <h2>x: {accelerometerX}, y: {accelerometerY}, z: {accelerometerZ}</h2>
        </div>
        <div className="chart">
          <svg width={"200"} height="200">
            <DonutChart height={200} totalCount={1000} width={200} value={light}/>
          </svg>
          <h5>light</h5>
          <h2>{light}</h2>
        </div>
      </div>
    );
  }
}

export default App;
/*
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
*/
