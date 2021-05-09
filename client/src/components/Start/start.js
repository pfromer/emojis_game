import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';

function useInput({ type /*...*/ }) {
    const [value, setValue] = useState("");
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
}

const Start = (props) => {
    


    return (
        <div>

        </div >
    );
};

const mapStateToProps = state => ({
    gameStarted: state.gameReducer.started
});

export default connect(mapStateToProps)(Start);