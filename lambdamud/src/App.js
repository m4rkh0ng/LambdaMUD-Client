import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import { Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
          <Route path="/login" component={LoginForm} />
          <Route path="/registration" component={Registration} />
          <Route path="/" exact component={Home} />
      </div>
    );
  }
}

export default App;
