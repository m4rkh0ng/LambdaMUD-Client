import React from 'react';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    const token = localStorage.getItem('lambda-token');
    if (!token) {
      this.props.history.replace('/login')
    }
  }

  render() {
    return (
      <div>
        Hello, world.
      </div>
    )
  }
}

export default Home;