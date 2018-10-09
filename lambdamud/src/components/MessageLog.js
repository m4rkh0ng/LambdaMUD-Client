import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  border: 1px solid #457B9D;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.16), 0 6px 6px rgba(45,45,45,0.23);
  background: rgba(240,240,240,.7);
  margin: 20px 0;
  min-height: 48em;
  text-align: left;
`

const MessageLog = (props) => {
  return (
    <Div className="game-message-log">
      {/* {props.messages.map((msgs, index) =>
      <div key={`msgs-${index}`}>
        {msgs.map((msg,index) => <p key={`msg-${index}`}>{msg}</p>)}
      </div>)} */}
    </Div>
  );
}

export default MessageLog;