import React from 'react';
import { connect } from 'react-redux';
import { Card } from '../Card/Card';
import { Container, OponentPlayerLabel, MainPlayerLabel, GameOver, Action } from './Styles.ts'
import { useDispatch } from 'react-redux'

const cardWidth = {
  currentPlayer: '30vh',
  currentCard: '30vh',
  computerPlayer: '20vh',
}

const Table = (props) => {
  const { gameStarted, allCards, gameLost, gameWon } = props;

  const dispatch = useDispatch()

  const resetClickHandler = () => {
    dispatch({
      type: 'RESET'
    })

    dispatch({
      type: 'ADD_PLAYER',
      id: 1,
      name: 'YOU',
      isCurrentPlayer: true
    })
    dispatch({
      type: 'ADD_PLAYER',
      id: 2,
      name: 'COMPUTER',
      isCurrentPlayer: false
    })

    dispatch({
      type: 'START_PLAYING_ALONE_SAGA'
    })
  };

  return (
    <React.Fragment>
      {gameStarted && (
        <Container gameOver={gameLost || gameWon}>
          <OponentPlayerLabel>Computer cards</OponentPlayerLabel>
          <MainPlayerLabel>Your cards</MainPlayerLabel>
          {allCards.map(card =>
            <Card card={card} key={card.id} clickable={true} cardWidth={cardWidth.currentPlayer}></Card>
          )}
        </Container>
      )}
      {(gameLost || gameWon) && (
        <React.Fragment>
          {gameLost && (<GameOver>You Lost <span>😬</span></GameOver>)}
          {gameWon && (<GameOver>You Won!!! Congratulations!!! <span>😎😎😎</span></GameOver>)}
          <Action onClick={resetClickHandler}>Keep Playing!</Action>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  allCards: state.gameReducer.allCards,
  gameStarted: state.gameReducer.started,
  gameWon: state.gameReducer.gameWon,
  gameLost: state.gameReducer.gameLost,
});

export default connect(mapStateToProps)(Table);