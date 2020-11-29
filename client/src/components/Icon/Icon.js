import React from 'react';
import { useDispatch } from 'react-redux'
import { StyledIcon } from './Styles'
import { useWindowSize } from '../../utils/windowsSize'




export const Icon = (props) => {
    const { icon, index, clickable, cardId } = props;
    const dispatch = useDispatch()
    const size = useWindowSize();

    const onClickHandler = () => {
        if (clickable) {
            dispatch({
                type: 'PLAYER_GUESS_ASYNC_2',
                iconId: icon.id,
                playerId: 1,
                cardId: cardId
            })
        }
    };

    return (
        <StyledIcon i={index} layout={0} onClick={onClickHandler}>{size.width < 760 ? icon.image : icon.image}</StyledIcon>
    );
};

