import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';

function useInput({ type /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
}

const Start = (props) => {
    const { gameStarted } = props;

    const [showUserNameForm, setShowUserNameForm] = useState(false);

    const [username, userInput] = useInput({ type: "text" });

    const dispatch = useDispatch()

    const [roomNumber, setRoomNumber] = useState(null);



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

    const onSubmitName = () => {
        dispatch({
            type: 'ADD_PLAYER',
            id: 1,
            name: username,
            isCurrentPlayer: true
        })
        setRoomNumber(Math.floor(Math.random() * (99999999999 - 1000 + 1)) + 1000)
    }

    return (
        <div>
            { !gameStarted && (
                <React.Fragment>
                    {!roomNumber && !showUserNameForm && (
                        <React.Fragment>
                            <button onClick={onPlayAloneClickHandler}>Play Alone</button>
                            <button onClick={() => setShowUserNameForm(true)}>Play against somebody</button>
                        </React.Fragment>
                    )}
                    { !roomNumber && showUserNameForm && (
                        <React.Fragment>
                            <label>Please tell us your name!</label>
                            {userInput} -&gt; {username} <br />
                            <button onClick={onSubmitName}>submit</button>
                        </React.Fragment>
                    )}
                    {
                        roomNumber && (
                            <React.Fragment>
                                <label>Share this link with your friend! The game will start as soon as he joins</label>
                                <br></br>
                                <label>http://localhost:8080/{roomNumber}</label>
                            </React.Fragment>
                        )
                    }
                </React.Fragment>
            )
            }
        </div >
    );
};

const mapStateToProps = state => ({
    gameStarted: state.gameReducer.started
});

export default connect(mapStateToProps)(Start);