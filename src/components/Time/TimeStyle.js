import styled from 'styled-components'

// Create a Title component that'll render an <h1> tag with some styles
const TimeStyle = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr;
  direction: ltr;
  padding: ${props=> props.padding !== undefined ? props.padding+'px' : '0px'}
  //justify-content: center;
  //margin: 2rem;
`;


export default TimeStyle;