import React from 'react';
import { StyledCard } from './Styles.js'
import { Icon } from '../Icon/Icon'

export const Card = (props) => {
    const { card, cardWidth } = props;
    return (
        <StyledCard cardWidth={cardWidth} zIndex={card.zIndex} belongsToCurrentPlayer={card.belongsToCurrentPlayer} left={card.left} isCentered={card.isCentered} index={card.index} initialPosition={card.initialPosition} shareCard={card.shareCard} >
            {card.icons.map((icon, index) => <Icon key={index} cardId={card.id} index={index} icon={icon} clickable={card.belongsToCurrentPlayer} />)}
        </StyledCard>
    );
};