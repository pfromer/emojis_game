import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledIcon } from './Styles'
import { useWindowSize } from '../../utils/windowsSize'

export const Icon = (props) => {
    const { icon, index, clickable, cardId } = props;
    const dispatch = useDispatch()
    const size = useWindowSize();


    let currentCard = useSelector(state => state.gameReducer.currentCard)

    let playerId = useSelector(state => state.gameReducer.players.filter(p => p.isCurrentPlayer)[0].id)

    const onClickHandler = () => {

      
      

      if(cardHasIcon(currentCard, icon.id)) {




        
        if (clickable) {
          
          dispatch({
            type: 'ROTATE_CARD',
            iconId: icon.id,
            playerId: playerId,
            cardId: cardId
          })
            
          dispatch({
            type: 'PLAYER_ICON_CLICK',
            iconId: icon.id,
            playerId: playerId,
            cardId: cardId
          })
        }
      }
    };

    return (
        <StyledIcon i={index} layout={0} onClick={onClickHandler}>{size.width < 760 ? icon.image : icon.image}</StyledIcon>
    );
};

const cardHasIcon = (card, iconId) => {
  return card.icons.find(icon => icon.id == iconId);
}

