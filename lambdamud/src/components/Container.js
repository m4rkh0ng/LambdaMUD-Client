import React from 'react';
import styled from 'styled-components';
import GamePlay form './GamePlay';
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
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Content className="container">
              <Gameplay />
              <GameInfo user={this.props.user} room={this.props.room}/>
            </Content>
         );
    }
}
 
export default Container;