import styled, { keyframes, css } from 'styled-components'

const moveToCenter = keyframes`
  from {
    top: ${p => p.top + '%'};
    left: calc(50vw - 15vh);
    transform: rotate(0deg)
  }

  to {
    top: 35%;
    left: calc(50vw - 15vh);
    transform: rotate(40deg)
  }
`;

const moveToEnd = keyframes`
  0%  {left: calc(50vw - 40vh); z-index: 58;}
  100% {left: ${p => 'calc(50vw - 15vh + ' + p.index + 'vw)'}; z-index: 0;}
`;

const moveToToPlayerCards = keyframes`
  from {
    top: 35%;
    left: calc(50vw - 15vh);
  }

  to {
    top: ${p => p.top + '%'};
    left: ${p => 'calc(50vw - 15vh + ' + p.index + 'vw)'};
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

    ${p => p.initialPosition && css`
      top: 35%;
      left: calc(50vw - 15vh);
    `}

    ${p => !p.initialPosition && css`
      top: ${p => p.top + '%'};
      left: ${p => 'calc(50vw - 15vh + ' + p.index + 'vw)'};
    `}

    z-index: ${p => p.zIndex};

    ${p => p.isCentered && css`
        animation: ${moveToCenter} 0.4s linear;
        animation-fill-mode: forwards;
    `}

    ${p => p.moveToEnd && css`
        animation: ${moveToEnd} 0.7s linear;
        animation-fill-mode: forwards;
    `}

    ${p => p.moveToToPlayerCards && css`
      animation: ${moveToToPlayerCards} 0.20s linear;
      animation-fill-mode: forwards;
    `}



    
`