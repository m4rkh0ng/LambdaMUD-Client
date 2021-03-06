import React from 'react';
import styled from 'styled-components';
import CharacterInfo from './CharacterInfo';
import RoomDescription from './RoomDescription';

const GameInformation = styled.div`
  width: 20%;
`

class GameInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <GameInformation className="game-information">
        <CharacterInfo user={this.props.user} />
        <RoomDescription room={this.props.room} playerList={this.props.playerList} />
      </GameInformation>
    );
  }
}

export default GameInfo;