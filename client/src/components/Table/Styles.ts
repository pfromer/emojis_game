import styled, { keyframes, css } from 'styled-components'

const containerWidth = 500

export const Container = styled('div') <{ gameOver: boolean }>`
    position: relative;
    height: 100vh;
        ${p => p.gameOver && css`
        opacity: 0;
        transition: all 2s;
    `}
`

export const CurrentPlayer = styled.div`
    width: ${containerWidth}px; 
    margin: auto;
    text-align: center;
`

export const CurrentCard = styled.div`
    width: ${containerWidth}px; 
    margin: auto;
    text-align: center;
`

export const ComputerPlayer = styled.div`
    width: ${containerWidth}px; 
    margin: auto;
    text-align: center;
`


export const MainPlayerLabel = styled.label`
    position: absolute;
    top: 80vh;
    left: calc(40vw - 15vh);
`

export const OponentPlayerLabel = styled.label`
    position: absolute;
    top: 10vh;
    left: calc(40vw - 15vh);
`

export const GameOver = styled.label`
    position: absolute;
    top: 50vh;
    left: 50vw;
    z-index: 1000;
`

export const Action = styled.a`
    position: absolute;
    top: 70vh;
    font-size: 80px;
    text-decoration: underline;
    cursor: pointer;
    left: 41vw;
`