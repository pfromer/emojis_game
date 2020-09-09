import React from 'react';
import { connect } from 'react-redux';
import { Card } from '../Card/Card';
import { Container, CurrentPlayer, CurrentCard, ComputerPlayer } from './Styles'

const cardWidth = {
  currentPlayer: '30vh',
  currentCard: '30vh',
  computerPlayer: '20vh',
}

const Table = (props) => {
  const { gameStarted, iconsCurrentPlayer, iconsCurrentCard, iconsComputerPlayer } = props;
  return (
    <Container>
      {gameStarted && (
        <React.Fragment>
          {/* este div es el mazo de la compu, en la que tendra mas de 1 carta*/}
          <ComputerPlayer>
            <Card icons={iconsComputerPlayer} clickable={false} cardWidth={cardWidth.computerPlayer}></Card>
          </ComputerPlayer>

          {/* este div es el mazo del centro, en la que tendra mas de 1 carta*/}
          <CurrentCard>
            <Card icons={iconsCurrentCard} clickable={false} cardWidth={cardWidth.currentCard}></Card>
          </CurrentCard>

          {/* este div es el mazo del jugador, en la que tendra mas de 1 carta*/}
          <CurrentPlayer >
            <Card icons={iconsCurrentPlayer} clickable={true} cardWidth={cardWidth.currentPlayer}></Card>
          </CurrentPlayer>


        </React.Fragment>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  gameStarted: state.gameReducer.started,
  iconsCurrentPlayer: state.gameReducer.started ? state.gameReducer.players.filter(p => p.isCurrentPlayer)[0].cards[0].icons : [],
  iconsCurrentCard: state.gameReducer.started ? state.gameReducer.currentCard.icons : [],
  iconsComputerPlayer: state.gameReducer.started ? state.gameReducer.players.filter(p => !p.isCurrentPlayer)[0].cards[0].icons : [],
});

export default connect(mapStateToProps)(Table);