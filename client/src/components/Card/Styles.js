import styled, { keyframes, css } from 'styled-components'

function moveOponentCardToCenter(index) {
  const animation = keyframes`
    to {
      transform: translate(-${index}vw, 35vh)  rotate(40deg);
    }
  `;
  return animation;
}

function moveCurrentPlayerCardToCenter(index) {
  const animation = keyframes`
    to {
      transform: translate(-${index}vw, -33vh)  rotate(40deg);
    }
  `;
  return animation;
}

const shareCard = keyframes`
  from {
    top: 100vh;
      left: 100vw;
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
      top: 100vh;
      left: 100vw;
    `}

    ${p => !p.initialPosition && css`
      top: ${p => p.top + '%'};
      left: ${p => 'calc(50vw - 15vh + ' + p.index + 'vw)'};
    `}

    z-index: ${p => p.zIndex};

    ${p => p.isCentered && p.top == 0 && css`
      animation: ${moveOponentCardToCenter(p.index)} 0.50s linear;
      animation-fill-mode: forwards;
    `}

    ${p => p.isCentered && p.top == 68 && css`
      animation: ${moveCurrentPlayerCardToCenter(p.index)} 0.50s linear;
      animation-fill-mode: forwards;
    `}

    ${p => p.shareCard && css`
      animation: ${shareCard} 0.40s ease;
      animation-fill-mode: forwards;
    `}
`