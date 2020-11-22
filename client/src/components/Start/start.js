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
            type: 'START_PLAYING_ASYNC'
        })
    };*/

    const dispatch = useDispatch()
    dispatch({
        type: 'START_PLAYING_ASYNC'
    })

    return (
        <div>
            <button>Jugar Solo</button>
            <button>Jugar contra alguien</button>

        </div>

    );
};


const mapStateToProps = state => ({
    playerSubmited: state.gameReducer.players.filter(p => p.isCurrentPlayer).length != 0,
    gameStarted: state.gameReducer.started
});

export default connect(mapStateToProps)(Start);