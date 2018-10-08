import React from 'react';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import axios from 'axios';
import NavBar from './NavBar';
import Container from './Container';
import Pusher from 'pusher-js';

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
    this.pusher = new Pusher('9d98e442e8dbbc7a4c83', {
      cluster: 'us2'
    })
    this.state = {  
      user: {
        username: '',
        uuid: ''
      },
      room: {
        title: '',
        players: []
      },
      text: ''
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('lambda-token');
    if (!token) {
      this.props.history.replace('/login')
    }
    this.gameInit(token);
    const channel = this.pusher.subscribe(`p-channel-${this.state.uuid}`)
    channel.bind('broadcast', data => {
      this.setState({ text: data.message });
    })
  }

  gameInit = async (token) => {
    try {
      const response = await axios.get("https://m4rkh0ng-mud.herokuapp.com/api/adv/init",
        {
        method: 'get',
        headers: {
          'Authorization': `Token ${token}`
        }
      })

      const user = {
        username: response.data.name,
        uuid: response.data.uuid
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
          <NavBar username={this.state.user.username} />
        </div>
        <div className="content">
          <Container user={this.state.user} room={this.state.room} />
        </div>
      </Div>
    )
  }
}

export default Home;