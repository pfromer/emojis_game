import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { createNewRoom } from '../../../ducks/socketReducer';
import { CenteredH1, CenteredForm, CenteredH2, MainContainer, SecondContainer, Emoji1, Emoji2 } from '../Styles'

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
    <MainContainer>
      <SecondContainer>
        <Emoji1>😂 </Emoji1> 
      <div>
        <CenteredH1>
        Welcome to Emojis Fun!!
        </CenteredH1>
        <CenteredH2>
          Please enter your name
        </CenteredH2>
        <CenteredForm onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text"  onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </CenteredForm>
        </div>
        <Emoji2>😂</Emoji2>
      </SecondContainer>
    </MainContainer>
  );
};

export default connect(null, { createNewRoom })(FirstUserStartPage);




