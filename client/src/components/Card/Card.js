import React from 'react';
import { connect } from 'react-redux';
import { StyledCard } from './Styles.js'
import { Icon } from '../Icon/Icon'

export const Card = (props) => {
    const { icons, cardWidth, clickable } = props;
    return (
        <StyledCard cardWidth={cardWidth}>
            {icons.map((icon, index) => <Icon key={index} index={index} icon={icon} clickable={clickable} />)}
        </StyledCard>
    );
};