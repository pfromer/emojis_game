import styled, { keyframes, css } from 'styled-components'


function moveIconDown() {
    const animation = keyframes`
      to {
        transform: translate(0vw, 100vh);
      }
    `;
    return animation;
}

export const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content:center;

`
export const Title = styled.div`
    position: absolute;
    top: 10vh;
    font-size: 40px;
`

export const Description = styled('div') <{ isMobile: boolean }>` 
    position: absolute;
    top: 30vh;
    font-size: ${p => (p.isMobile ? 35 : 25) + 'px'};
`
export const Description2 = styled.div`
    position: absolute;
    top: 35vh;
    font-size: 25px;
`

export const Action = styled.a`
    position: absolute;
    top: 70vh;
    font-size: 80px;
    text-decoration: underline;
    cursor: pointer;
`
export const StyledIcon = styled('span') <{ i: number, reverse: boolean }>` 
    position: absolute;
    left: ${p => 'calc(' + (p.reverse ? -p.i : p.i) + 'vw)'};
    animation: ${moveIconDown()} ${p => p.i * 0.3 + 's'} linear;
    animation-fill-mode: forwards;
`

export const IconsContainer = styled('div') <{ reverse: boolean }>`
    position: absolute;
    font-size: 25px; 
    margin-left: ${p => (p.reverse ? 59 : -59) + 'vw'};
`