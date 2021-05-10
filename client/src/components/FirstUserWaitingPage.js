import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Table from './Table/table'

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
  
  let room = useSelector(state => state.socketReducer.room)
  return (

    <React.Fragment>
      {!gameStarted && (
        <div>
          <h1>Hello {self_name}! Please share this link with a friend and wait for him to connect!</h1>
          <div>http://localhost:8080/second_user/{room}/{self_name.replace(' ','-')}</div>
        </div>
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