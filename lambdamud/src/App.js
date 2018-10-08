import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    // 
    // }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/login" component={LoginForm} />
          <Route path="/registration" component={Registration} />
          <Route path="/" exact component={Home} />
        </Router>
      </div>
    );
  }
}

export default App;
