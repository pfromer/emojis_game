import React from 'react';
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';


const Start = (props) => {

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
            <button onClick={onPlayAloneClickHandler} >Jugar Solo</button>
            <button>Jugar contra alguien</button>
        </div>

    );
};


const mapStateToProps = state => ({
    playerSubmited: state.gameReducer.players.filter(p => p.isCurrentPlayer).length != 0,
    gameStarted: state.gameReducer.started
});

export default connect(mapStateToProps)(Start);