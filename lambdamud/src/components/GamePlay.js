import React from 'react';
import styled from 'styled-components';
import MessageLog from './MessageLog';
import InputCommand from './InputCommand';

const GameControl = styled.div`
  width: 70%;
`

class GamePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const message = [`Welcome to the adventure!`];
    console.log(message);
    this.setState({ data: message });
  }

  render() {
    return (
      <GameControl className="game-control">
        <MessageLog data={this.state.data}/>
        <InputCommand 
          command={this.props.command}
          changeHandler={this.props.changeHandler}
          submitHandler={this.props.submitHandler}
        />
      </GameControl>
    );
  }
}

export default GamePlay;