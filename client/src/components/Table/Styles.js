import styled from 'styled-components'

const containerWidth = 500

export const Container = styled.div`
    position: relative;
    height: 100vh;
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