import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/Login';
import Registration from './components/Registration';

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
        <Route path="/login" component={LoginForm} />
        <Route path="/registration" component={Registration} />
        <Route path="/" exact component={Home} />
      </div>
    );
  }
}

export default App;
