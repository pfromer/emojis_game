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
  const { gameStarted, allCards, oponentPlayerName, currentPlayerName, gameWon, gameLost } = props;

  console.log("GAME WON", gameWon)
  console.log("GAME LOST", gameLost)
  console.log("GAME STARTED", gameStarted)



  return (
    <React.Fragment>
      {gameStarted &&(
        <Container gameOver={gameLost || gameWon}>
          <OponentPlayerLabel>{oponentPlayerName}</OponentPlayerLabel>
          <MainPlayerLabel>{currentPlayerName}</MainPlayerLabel>
          {allCards.map(card =>
            <Card card={card} key={card.id} clickable={true} cardWidth={cardWidth.currentPlayer}></Card>
          )}
        </Container>
      )}
      {(gameLost || gameWon) && (
        <FlexContainer>
          {gameLost && (<GameOver>You Lost <span>😬</span></GameOver>)}
          {gameWon && (<GameOver>You Won!!! Congratulations!!! <span>😎😎😎</span></GameOver>)}
          <Action href={process.env.DOMAIN}>Keep Playing!</Action>
        </FlexContainer>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  allCards: state.gameReducer.allCards,
  gameStarted: state.gameReducer.started,
  currentPlayerName: state.gameReducer.players.filter(p => p.isCurrentPlayer)[0].name,
  oponentPlayerName: state.gameReducer.players.filter(p => !p.isCurrentPlayer)[0].name,
  gameWon: state.gameReducer.gameWon,
  gameLost: state.gameReducer.gameLost
});

export default connect(mapStateToProps)(Table);