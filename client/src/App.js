import React, { Component } from 'react';
import Connection from './Connection';
import DonutChart from './DonutChart';
import './App.css';

class App extends Component {
  // Initialize state
  constructor() {
    super();
    this.state = {
      passwords: [],
      heartrate: 114,
      flex: 0.4,
      accelerometerX: 0.1,
      accelerometerY: 0.1,
      accelerometerZ: 0.1,
    }
    this._connection = new Connection();
    this.updateHeartrate = this.updateHeartrate.bind(this);
    console.log(this._connection);

    //Listen to Connection.emit
    this._connection.on('UPDATE_HEARTRATE', (data) => {
      console.log('received heartRate', data);
      this.setState({heartrate: data})
    });
  }


  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  updateHeartrate = () => {
    this._connection.updateHeartrate(78);
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {passwords.length ? (
          <div>
            <h1>5 Passwords.</h1>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.updateHeartrate}>
              Update heartrate?
            </button>
          </div>
        )}
        <svg width="300" height="300">
          <DonutChart width={300} height={300} value={this.state.heartrate}/>
        </svg>
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
