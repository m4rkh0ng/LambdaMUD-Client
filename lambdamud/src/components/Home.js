import React from 'react';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import axios from 'axios';
import NavBar from './NavBar';
import Container from './Container';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  padding: 0;
`

const Header = styled.div`
  height: 20%;
`

const Content = styled.div`
  height: 80%;
`

const Image = styled.img`
  margin: 20px 0;
`

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      user: {
        username: ''
      },
      room: {
        title: '',
        players: []
      }
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('lambda-token');
    if (!token) {
      this.props.history.replace('/login')
    }
    this.gameInit(token);
  }

  gameInit = async (token) => {
    try {
      const response = await axios({
        url: 'https://m4rkh0ng-mud.herokuapp.com/api/adv/init',
        method: 'get',
        headers: {
          'Authorization': `Token ${token}`
        }
      })

      const user = {
        username: response.data.name
      }

      const room = {
        title: response.data.title,
        players: response.data.players
      }

      this.setState({
        user,
        room
      });
    } catch (err) {
        console.log(err.response);
    }
  }

  render() {
    return (
      <Div>
        <div className="header">
          <NavBar username={this.state.user.username}/>
        </div>
        <div className="content">
          <Container user={this.state.user} room={this.state.room}/>
        </div>
      </Div>
    )
  }
}

export default Home;