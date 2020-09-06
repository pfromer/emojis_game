import React from 'react';
import { connect } from 'react-redux';
import { StyledCard } from './Styles.js'
import { Icon } from '../Icon/Icon'


export const Card = (props) => {
    const { icons } = props;
    return (
        <StyledCard>
            {icons.map((v, i) => <Icon key={i} i={i} image={v.image} />)}
        </StyledCard>
    );
};