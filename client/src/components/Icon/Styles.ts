import styled, { css } from 'styled-components'
import { Layouts } from './Layouts'

function setIcon(fontSize, top, left, rotate) {
    return `
        font-size: ${fontSize}em;
        top: ${top}%;
        left: ${left}%;
        transform: rotate(${rotate}deg);
    `
}

function setLayout(layout, i) {
    return setIcon(
        Layouts[layout][i].fontSize,
        Layouts[layout][i].top,
        Layouts[layout][i].left,
        Layouts[layout][i].rotate
    )
}
export const StyledIcon = styled('span') <{ i: number, layout: number }>`
    position: absolute;
   
    ${props => css`
        ${setLayout(props.layout, props.i)}       
    `}
`