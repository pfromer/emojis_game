import React from 'react';
import { connect } from 'react-redux';
import { Card } from '../Card/Card';

const Table = (props) => {
    const { gameStarted, iconsCurrentPlayer, iconsCurrentCard, iconsComputerPlayer } = props;
    return (
        <div>
            {gameStarted &&
                <div>
                    <Card icons={iconsCurrentPlayer}></Card>
                    <Card icons={iconsCurrentCard} ></Card>
                    <Card icons={iconsComputerPlayer}></Card>
                </div>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    gameStarted: state.gameReducer.started,
    iconsCurrentPlayer: state.gameReducer.started ? state.gameReducer.players.filter(p => p.isCurrentPlayer)[0].cards[0].icons : [],
    iconsCurrentCard: state.gameReducer.started ? state.gameReducer.currentCard.icons : [],
    iconsComputerPlayer: state.gameReducer.started ? state.gameReducer.players.filter(p => !p.isCurrentPlayer)[0].cards[0].icons : [],
});

export default connect(mapStateToProps)(Table);