import styled, { css } from 'styled-components'

export const StyledIcon = styled('span') <{ i: number }>`



${props => props.i == 0 && css`
    font-size: 100px;
    top: 30px;
    left: 200px;
    position: absolute;
`}

${props => props.i == 1 && css`
    font-size: 120px;
    bottom: 0px;
    right: 233px;
    position: absolute;
`}

${props => props.i == 2 && css`
    right: 30px;
    top: 207px;
    font-size: 120px;
    position: absolute;
`}

${props => props.i == 3 && css`
    font-size: 80px;
    top: 97px;
    right: 97px;
    position: absolute;
`}

${props => props.i == 4 && css`
    font-size:100px;
    top: 271px;
    left: 79px;
    position: absolute;
`}

${props => props.i == 5 && css`
    font-size:100px;
    top: 166px;
    left: 206px;
    position: absolute;
`}

${props => props.i == 6 && css`
    font-size:100px;
    top: 150px;
    left: 30px;
    position: absolute;
`}

${props => props.i == 7 && css`
    font-size:100px;
    top: 330px;
    left: 311px;
    position: absolute;
`}


`