import styled, { keyframes, css } from 'styled-components'



const moveToCenter = keyframes`
  from {
    top: ${p => p.top + '%'};
    transform: rotate(0deg)
  }

  to {
    top: 35%;
    left: calc(50vw - 15vh);
    transform: rotate(40deg)
  }
`;

export const StyledCard = styled.div`
    height: ${p => p.cardWidth};
    width: ${p => p.cardWidth};
    background-color: #fff;
    box-shadow: 3px 3px 6px 0px rgba(50,50,50,0.2);
    border-radius: 50%;
    font-size: ${p => p.cardWidth};
    display: inline-block;
    position: absolute;
    top: ${p => p.top + '%'};
    left: ${p => 'calc(50vw - 15vh + ' + p.index + 'vw)'};
    z-index: ${p => p.zIndex};

    ${p => p.isCentered && css`
        animation: ${moveToCenter} 0.2s linear;
        animation-fill-mode: forwards;
    `}

    
`