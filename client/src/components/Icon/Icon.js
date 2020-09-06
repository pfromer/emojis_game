import React from 'react';
import { StyledIcon } from './Styles'


export const Icon = (props) => {
    const { image, i } = props;
    return (
        <StyledIcon i={i}>{image}</StyledIcon>
    );
};

