import React from 'react';
import { connect } from 'react-redux';
import { Card } from '../Card/Card';
import { Container, OponentPlayerLabel, MainPlayerLabel, GameOver, Action, FlexContainer } from './Styles.ts'
import { useDispatch } from 'react-redux'

const cardWidth = {
  currentPlayer: '30vh',
  currentCard: '30vh',
  computerPlayer: '20vh',
}

const Table = (props) => {
  const { gameStarted, allCards, oponentPlayerName, currentPlayerName } = props;

  const dispatch = useDispatch()
  debugger


  return (
    <React.Fragment>
      {gameStarted && (
        <Container gameOver={false}>
          <OponentPlayerLabel>{oponentPlayerName}</OponentPlayerLabel>
          <MainPlayerLabel>{currentPlayerName}</MainPlayerLabel>
          {allCards.map(card =>
            <Card card={card} key={card.id} clickable={true} cardWidth={cardWidth.currentPlayer}></Card>
          )}
        </Container>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  allCards: state.gameReducer.allCards,
  gameStarted: state.gameReducer.started,
  currentPlayerName: state.gameReducer.players.filter(p => p.isCurrentPlayer)[0].name,
  oponentPlayerName: state.gameReducer.players.filter(p => !p.isCurrentPlayer)[0].name,
});

export default connect(mapStateToProps)(Table);