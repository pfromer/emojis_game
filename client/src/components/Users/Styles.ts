import styled, { keyframes, css } from 'styled-components'

export const CenteredH1 = styled.h1`
    text-align : center;
    margin-top : 0;
`

export const CenteredH2 = styled.h2`
    text-align : center;
`

export const CenteredForm = styled.form`
    text-align : center;
`
export const CenteredDiv = styled.div`
    text-align : center;
`

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: center;
  height: 80vh;
`

export const SecondContainer = styled.div`
  display: flex;  
`

const upAndDown = keyframes`
    0%   { top: 0px; }
    50% { top: 100px; }
    100% { top: 0px; }
    }
`;

const downAndUp = keyframes`
    0%   { top: 100px; }
    50% { top: 0px; }
    100% { top: 100px; }
    }
`;

export const Emoji1 = styled.span`
  position: relative;  
  font-size: 2em;
  animation: ${upAndDown} 3s infinite;
`

export const Emoji2 = styled.span`
  position: relative;  
  font-size: 2em;
  animation: ${downAndUp} 3s infinite;
`

export const CenteredWatch = styled.div`
  text-align : center;
  font-size: 12em;
`
