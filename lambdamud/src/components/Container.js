import React from 'react';
import styled from 'styled-components';
import GamePlay from './GamePlay';
import GameInfo from './GameInfo';

const GameControl = styled.div`
    width: 70%;
`

const GameInfomation = styled.div`
    width: 20%;
`

const Content = styled.div`
    display: flex;
    justify-content: space-around;
    margin: 2% 0;
`

class Container extends React.Component {
    
    render() { 
        return ( 
            <Content className="container">
              <GamePlay 
                messages={this.props.messages}
                command={this.props.command}
                changeHandler={this.props.changeHandler}
                submitHandler={this.props.submitHandler}
              />
              <GameInfo 
                user={this.props.user} 
                room={this.props.room}
                playerList={this.props.playerList}
              />
            </Content>
         );
    }
}
 
export default Container;