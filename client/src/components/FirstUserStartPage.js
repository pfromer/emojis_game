import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createNewRoom } from '../ducks/socketReducer';

const FirstUserStartPage = (props) => {
  const { createNewRoom } = props;
  const [name, setName] = useState('');
  const dispatch = useDispatch()
  
  const handleSubmit = (event) => {
    dispatch({
      type: 'ADD_PLAYER',
      id: 1,
      name: name,
      isCurrentPlayer: true
    })
    createNewRoom(name)
  
    event.preventDefault();
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
     <div>
      <h1>
        Welcome to Emojis Fun!! Please enter your name
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text"  onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    </div>
  );
};

export default connect(null, { createNewRoom })(FirstUserStartPage);