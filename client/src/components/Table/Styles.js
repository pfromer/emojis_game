import styled from 'styled-components'

const containerWidth = 500

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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