import styled, { keyframes, css } from 'styled-components'
import { Layouts } from './Layouts'


const rotate = keyframes`
0% {
  background-color:red
}
100% {
    background-color:white
}
  `;

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
    cursor: pointer;
   
    ${props => css`
        ${setLayout(props.layout, props.i)}       
    `}

    ${props => props.rotated && css`
        animation: ${rotate} 4s ease;
        animation-fill-mode: forwards;
    `}
`