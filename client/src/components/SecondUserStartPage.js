import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const SecondUserStartPage = () => {
  const { room_number, friend_name } = useParams();
  const [name, setName] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'SET_IS_FIRST_USER',
      isFirstUser: false
    })
  
    dispatch({
      type: 'START_CHANNEL',
    })
  
    dispatch({
      type: 'SET_ROOM',
      room: room_number
    })

    dispatch({
      type: 'JOIN_ROOM',
    })

  }, [])

  const handleSubmit = (event) => {

    dispatch({
      type: 'ADD_PLAYER',
      id: 1,
      name: friend_name,
      isCurrentPlayer: false
    })

    dispatch({
      type: 'ADD_PLAYER',
      id: 2,
      name: name,
      isCurrentPlayer: true
    })

    /*dispatch({
      type: 'JOIN_ROOM',
    })*/
    

    dispatch({
      type: 'SECOND_USER_COMPLETED_FORM'
    })
  
    event.preventDefault();
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
     <div>
      <h1>
        Welcome to Emojis Fun!! {friend_name} is waiting for you to join.
      </h1>
      <h2>
        Please enter your name
      </h2>
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
}

export default SecondUserStartPage