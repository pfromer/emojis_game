import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import Table from '../../Table/table'
import { CenteredH1, CenteredForm, CenteredH2, MainContainer, SecondContainer, Emoji1, Emoji2 } from '../Styles'

const SecondUserStartPage = (props) => {
  const { room_number, friend_name } = useParams();
  const { gameStarted } = props
  const [name, setName] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'SET_IS_FIRST_USER',
      isFirstUser: false
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
  }, [])

  const handleSubmit = (event) => {

    dispatch({
      type: 'ADD_PLAYER',
      id: 1,
      name: friend_name,
      isCurrentPlayer: false
    })

    dispatch({
      type: 'ADD_PLAYER',
      id: 2,
      name: name,
      isCurrentPlayer: true
    })

    dispatch({
      type: 'SECOND_USER_COMPLETED_FORM'
    })
  
    event.preventDefault();
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  console.log("Start page game started", gameStarted)

  return (
    <React.Fragment>
      {!gameStarted && (
      <MainContainer>
        <SecondContainer>
          <Emoji1>🕓 </Emoji1> 
            <div>
              <CenteredH1>
                Welcome to Emojis Fun!! {friend_name} is waiting for you to join.
              </CenteredH1>
              <CenteredH2>
                Please enter your name
              </CenteredH2>
              <CenteredForm onSubmit={handleSubmit}>
                <label>
                  Name:
                  <input type="text"  onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
              </CenteredForm>
            </div>
          <Emoji2>🕣 </Emoji2> 
        </SecondContainer>
      </MainContainer>
          )}
      {gameStarted && (
        <Table/>
      )}
</React.Fragment>
  );
}

const mapStateToProps = state => ({
  gameStarted: state.gameReducer.started
});

export default connect(mapStateToProps)(SecondUserStartPage);

