import React from 'react';
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';


const Start = (props) => {
    const { gameStarted } = props;

    /*const { playerSubmited, gameStarted } = props;

    const dispatch = useDispatch()
    const [name, setName] = useState('');

    const onChangeHandler = (event) => {
        setName(event.target.value);
    };

    const onPlayAloneClickHandler = () => {
        dispatch({
            type: 'ADD_PLAYER',
            id: 1,
            name: name,
            isCurrentPlayer: true
        })
    };

    const onStartPlayingClickHandler = () => {
        dispatch({
            type: 'START_PLAYING_ASYNC'
        })
    };*/

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
                <React.Fragment>
                    <button onClick={onPlayAloneClickHandler} >Play Alone</button>
                    <button>Play against somebody</button>
                </React.Fragment>
            )}
        </div>
    );
};


const mapStateToProps = state => ({
    gameStarted: state.gameReducer.started
});

export default connect(mapStateToProps)(Start);