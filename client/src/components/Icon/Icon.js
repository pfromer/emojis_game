import React from 'react';
import { useDispatch } from 'react-redux'
import { StyledIcon } from './Styles'

export const Icon = (props) => {
    const { icon, index, clickable } = props;
    const dispatch = useDispatch()

    const onClickHandler = () => {
        if (clickable) {
            dispatch({
                type: 'PLAYER_GUESS',
                iconId: icon.id,
                playerId: 1
            })
        }
    };

    return (
        <StyledIcon i={index} layout={0} onClick={onClickHandler}>{icon.image}</StyledIcon>
    );
};

