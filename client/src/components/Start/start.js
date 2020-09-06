import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';


const Start = (props) => {

    const { playerSubmited, gameStarted } = props;

    const dispatch = useDispatch()
    const [name, setName] = useState('');

    const onChangeHandler = (event) => {
        setName(event.target.value);
    };

    const onClickHandler = () => {
        dispatch({
            type: 'ADD_PLAYER',
            id: 1,
            name: name,
            isCurrentPlayer: true
        })
    };

    const onStartPlayingClickHandler = () => {
        dispatch({
            type: 'START_PLAYING'
        })
    };

    return (
        <div>
            {!playerSubmited &&
                <form>
                    <h1>Hello</h1>
                    <p>Enter your name:</p>
                    <input
                        type="text"
                        onChange={onChangeHandler}
                    />
                    <button onClick={onClickHandler}>Submit</button>
                </form>
            }
            {!gameStarted && playerSubmited &&
                <button onClick={onStartPlayingClickHandler}>Start Playing!</button>
            }
        </div>

    );
};


const mapStateToProps = state => ({
    playerSubmited: state.gameReducer.players.filter(p => p.isCurrentPlayer).length != 0,
    gameStarted: state.gameReducer.started
});

export default connect(mapStateToProps)(Start);