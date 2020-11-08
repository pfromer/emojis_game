import React from 'react';
import { StyledCard } from './Styles.js'
import { Icon } from '../Icon/Icon'

export const Card = (props) => {
    const { card, cardWidth, clickable, top, bottom, zIndex } = props;
    return (
        <StyledCard cardWidth={cardWidth} zIndex={card.zIndex} top={card.top} left={card.left} isCentered={card.isCentered} index={card.index} initialPosition={card.initialPosition} shareCard={card.shareCard} >
            {card.icons.map((icon, index) => <Icon key={index} cardId={card.id} index={index} icon={icon} clickable={clickable} top={top} bottom={bottom} zIndex={zIndex} />)}
        </StyledCard>
    );
};