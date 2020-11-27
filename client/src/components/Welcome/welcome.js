import React from 'react';
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';
import { Container, Description, Description2, Title, Action, StyledIcon, IconsContainer } from './Styles.ts'
import { allIcons } from '../../modules/allIcons';

const Welcome = (props) => {
    const { gameStarted } = props;

    const dispatch = useDispatch()

    const onPlayAloneClickHandler = () => {
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
        <div>
            { !gameStarted && (
                <Container>
                    <Title>Welcome to emojis FUN!</Title>
                    <Description>Click on the emoji in common between your card and the card in the center of the table.</Description>
                    <Description2>Every pair of cards has one and only one emoji in common!</Description2>
                    <Action onClick={onPlayAloneClickHandler}>Start Playing</Action>
                    <IconsContainer>
                        {
                            allIcons.map(i => <StyledIcon key={i.id} i={i.id}>{i.image}</StyledIcon>)
                        }
                    </IconsContainer>
                </Container>
            )
            }
        </div>
    );
};

const mapStateToProps = state => ({
    gameStarted: state.gameReducer.started
});

export default connect(mapStateToProps)(Welcome);