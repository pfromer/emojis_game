import React from 'react';
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';
import { Container, Description, Description2, Title, Action, StyledIcon, IconsContainer } from './Styles.ts'
import { allIcons } from '../../modules/allIcons';
import { useWindowSize } from '../../utils/windowsSize'

const Welcome = (props) => {
    const { gameStarted } = props;
    const size = useWindowSize();
    const dispatch = useDispatch();
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
                    {
                        size.width < 900 && (
                            <React.Fragment>
                                <Title>Emojis Fun is not available for mobile devices yet.</Title>
                                <Description isMobile={true}>Please try Emojis Fun in a wider screen.</Description>
                            </React.Fragment>
                        )
                    }
                    {
                        size.width >= 900 && (
                            <React.Fragment>
                                <Title>Welcome to emojis FUN!</Title>
                                <Description isMobile={false}>Click on the emoji in common between your card and the card in the center of the table.</Description>
                                <Description2>Every pair of cards has one and only one emoji in common!</Description2>
                                <Action onClick={onPlayAloneClickHandler}>Start Playing</Action>
                            </React.Fragment>
                        )
                    }
                    <IconsContainer reverse={false}>
                        {
                            allIcons.map(i => <StyledIcon key={i.id} i={i.id} reverse={false}>{i.image}</StyledIcon>)
                        }
                    </IconsContainer>
                    <IconsContainer reverse={true}>
                        {
                            allIcons.map(i => <StyledIcon key={i.id} i={i.id} reverse={true}>{i.image}</StyledIcon>)
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