import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Table from '../../Table/table'
import { CenteredH1, CenteredDiv, CenteredH2, MainContainer, CenteredWatch } from '../Styles'

const FirstUserWaitingPage = (props) => {
  const { room_number, self_name } = useParams();
  const { gameStarted } = props
  const dispatch = useDispatch()
  
  dispatch({
    type: 'ADD_PLAYER',
    id: 1,
    name: self_name,
    isCurrentPlayer: true
  })

  dispatch({
    type: 'SET_IS_FIRST_USER',
    isFirstUser: true
  })

  dispatch({
    type: 'START_CHANNEL',
  })

  dispatch({
    type: 'SET_ROOM',
    room: room_number
  })

  dispatch({
    type: 'JOIN_ROOM',
  })

  console.log("First user waiting page game started", gameStarted)
  
  let room = useSelector(state => state.socketReducer.room)
  return (
    <React.Fragment>
       <a href={process.env.DOMAIN}>New Game</a>
      {!gameStarted && (
        <MainContainer>
          <div>
            <CenteredH1>Hello {self_name}!</CenteredH1>
            <CenteredH2>Please share this link with a friend and wait for him to connect!</CenteredH2>
            <CenteredDiv>{process.env.DOMAIN}/second_user/{room}/{self_name.replace(' ','-')}</CenteredDiv>
            <CenteredWatch>🕰</CenteredWatch>
          </div>
        </MainContainer>
      )}
      {gameStarted && (
        <Table/>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  gameStarted: state.gameReducer.started
});

export default connect(mapStateToProps)(FirstUserWaitingPage);