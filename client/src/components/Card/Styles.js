import styled from 'styled-components'

export const StyledCard = styled.div`
    height: ${p => p.cardWidth};
    width: ${p => p.cardWidth};
    background-color: #fff;
    box-shadow: 3px 3px 6px 0px rgba(50,50,50,0.2);
    border-radius: 50%;
    font-size: ${p => p.cardWidth};
    display: inline-block;
    position: relative;
`