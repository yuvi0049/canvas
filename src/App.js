import React, { Component } from 'react';
import HomePage from './pages/homePage/HomePage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Roman 3</h2>

        <div className="App-content">
          <HomePage />
        </div>
      </div>
    );
  }
}

export default App;
