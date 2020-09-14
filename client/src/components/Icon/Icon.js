import React from 'react';
import { useDispatch } from 'react-redux'
import { StyledIcon } from './Styles'

export const Icon = (props) => {
    const { icon, index, clickable, cardId } = props;
    const dispatch = useDispatch()

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
        <StyledIcon i={index} layout={0} onClick={onClickHandler}>{icon.image}</StyledIcon>
    );
};

