import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledIcon } from './Styles'

export const Icon = (props) => {
    const { icon, index, clickable, cardId } = props;
    const dispatch = useDispatch()
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
      } else {
        //TODO block game for 8 seconds
      }
    };

    return (
        <StyledIcon i={index} layout={0} onClick={onClickHandler}>{icon.image}</StyledIcon>
    );
};

const cardHasIcon = (card, iconId) => {
  return card.icons.find(icon => icon.id == iconId);
}