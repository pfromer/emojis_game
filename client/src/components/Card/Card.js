import React from 'react';
import { connect } from 'react-redux';
import { StyledCard } from './Styles.js'
import { Icon } from '../Icon/Icon'


const Card = (props) => {
    const { icons, gameStarted } = props;
    return (
        <div>
            {gameStarted &&
                <StyledCard>
                    {icons.map((v, i) => <Icon key={i} i={i} image={v.image} />)}
                </StyledCard>
            }</div>
    );
};

const mapStateToProps = state => ({
    gameStarted: state.gameReducer.started,
    icons: state.gameReducer.started ? state.gameReducer.players.filter(p => p.isCurrentPlayer)[0].cards[0].icons : []
});

export default connect(mapStateToProps)(Card);