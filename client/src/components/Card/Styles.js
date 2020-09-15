import styled, { keyframes, css } from 'styled-components'



const moveToCenter = keyframes`
  from {
    top: ${p => p.top + '%'};
  }

  to {
    top: 35%;
    left: 50%;
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
    left: ${p => (p.left + p.index) + '%'};
    z-index: ${p => p.zIndex};

    ${p => p.isCentered && css`
        animation: ${moveToCenter} 0.2s linear;
        animation-fill-mode: forwards;
    `}
`