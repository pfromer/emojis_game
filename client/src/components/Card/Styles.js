import styled, { keyframes, css } from 'styled-components'

const currentPlayerTop = 68;
const oponentPlayerTop = 0;
const verticalCenteredTop = 35;

function getTop(belongsToCurrentPlayer) {
  if (belongsToCurrentPlayer == null) {
    return verticalCenteredTop;
  }
  if (belongsToCurrentPlayer) {
    return currentPlayerTop;
  }
  return oponentPlayerTop;
}

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
    top: ${p => getTop(p.belongsToCurrentPlayer) + '%'};
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
      top: ${p => getTop(p.belongsToCurrentPlayer) + '%'};
      left: ${p => 'calc(50vw - 15vh + ' + p.index + 'vw)'};
    `}

    z-index: ${p => p.zIndex};

    ${p => p.isCentered && p.belongsToCurrentPlayer === false && css`
      animation: ${moveOponentCardToCenter(p.index)} 0.50s linear;
      animation-fill-mode: forwards;
    `}

    ${p => p.isCentered && p.belongsToCurrentPlayer && css`
      animation: ${moveCurrentPlayerCardToCenter(p.index)} 0.50s linear;
      animation-fill-mode: forwards;
    `}

    ${p => p.shareCard && css`
      animation: ${shareCard} 0.40s ease;
      animation-fill-mode: forwards;
    `}
`