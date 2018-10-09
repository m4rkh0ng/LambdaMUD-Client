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
        description: ''
      },
      playerList: [],
      messages: [['Welcome adventurer']],
      error_msg: '',
      command: ''
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('lambda-token');
    if (!token) {
      this.props.history.replace('/login')
    }
    this.gameInit(token);
    const channel = this.pusher.subscribe(`p-channel-${this.state.uuid}`)
    // const newdata = this.state.data.slice();
    channel.bind('broadcast', data => {
      alert(data);
      this.setState({ messages: [...this.state.messages, [data.message]] });
    })
  }

  changeHandler = (e) => {
    this.setState({
      command: e.target.value
    });
  }

  move = (direction) => {
    const token = localStorage.getItem('lambda-token');
    const payload = {
      direction: direction
    }
    return axios.post("https://m4rkh0ng-mud.herokuapp.com/api/adv/move", payload,
      {
        headers: {
          "Authorization": `Token ${token}`,
        }
      })
  }

  parseCommand = (command) => {
    const commands = command.split(' ');
    if (commands.length === 2) {
      if (commands[0] === 'move') {
        try {
          return this.move(commands[1])
        } catch (err) {
          return err.response.data
        }
      } else if (commands[0] === 'say') {
        return;
      }
    } else {
      return;
    }
  }

  submitHandler = async (e) => {
    e.preventDefault();
    const response = await this.parseCommand(this.state.command);
    const newMsg = response.data.error_msg ? [response.data.error_msg] : [response.data.title, response.data.description]
    this.setState({
      messages: [...this.state.messages, newMsg],
      room: {
        ...this.state.room,
        title: response.data.title,
        description: response.data.description
      },
      playerList: response.data.players,
      error_msg: response.data.error_msg,
      command: ''
    });
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
        description: response.data.description,
      }

      const playerList = response.data.players

      this.setState({
        user: user,
        room: room,
        messages: [...this.state.messages, Object.values(room)],
        playerList: playerList
      });

      const sub = 'p-channel-' + response.data.uuid;
      const channel = this.pusher.subscribe(sub);
      channel.bind('broadcast', data => {
        this.setState({ messages: [...this.state.messages, [data.message]] });
      })
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
          <Container 
            user={this.state.user} 
            room={this.state.room}
            messages={this.state.messages}
            error_msg={this.state.error_msg}
            playerList={this.state.playerList}
            command={this.state.command}
            changeHandler={this.changeHandler}
            submitHandler={this.submitHandler}
          />
        </div>
      </Div>
    )
  }
}

export default Home;