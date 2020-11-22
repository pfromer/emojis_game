import React from 'react';
import { connect } from 'react-redux';
import { Card } from '../Card/Card';
import { Container, OponentPlayerLabel, MainPlayerLabel } from './Styles'

const cardWidth = {
  currentPlayer: '30vh',
  currentCard: '30vh',
  computerPlayer: '20vh',
}

const Table = (props) => {
  const { gameStarted, allCards } = props;

  return (
    <Container>
      {gameStarted && (
        <React.Fragment>
          <OponentPlayerLabel>Computer cards</OponentPlayerLabel>
          <MainPlayerLabel>Your cards</MainPlayerLabel>

          {allCards.map(card =>
            <Card card={card} key={card.id} clickable={true} cardWidth={cardWidth.currentPlayer}></Card>
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  allCards: state.gameReducer.allCards,
  gameStarted: state.gameReducer.started
});

export default connect(mapStateToProps)(Table);