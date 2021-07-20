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
    z-index: 1000;
`

export const Action = styled.a`
    position: absolute;
    top: 70vh;
    font-size: 80px;
    text-decoration: underline;
    cursor: pointer;
`
export const FlexContainer = styled.div`
    display: flex;
    justify-content: center;

`

export const DimScreen = styled.div`
    position:absolute;
    padding:0;
    margin:0;

    top:0;
    left:0;

    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 55%);
    z-index: 900;
`

export const WrongIconMessage = styled.div`
    top: 40%;
    left: calc(50vw - 35vh + 0vw);
    position: absolute;
    font-size: 4em;
    color: white;
`

export const RemainingTimeDiv = styled.div`
    top: 50%;
    left: calc(50vw - 2vh );
    position: absolute;
    font-size: 4em;
    color: white;
`

