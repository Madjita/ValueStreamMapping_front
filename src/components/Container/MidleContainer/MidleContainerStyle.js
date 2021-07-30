import styled from 'styled-components'

// Create a Title component that'll render an <h1> tag with some styles
const MidleContainerStyle = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
  //animation: ${props => props.LeftMenu ? 'left-menu-open' : 'left-menu-close'} 1s linear 1 forwards
  //left: ${props => props.LeftMenu ? '20%' : 0}
`;


export default MidleContainerStyle;