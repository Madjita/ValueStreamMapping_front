import styled from 'styled-components'

// Create a Title component that'll render an <h1> tag with some styles
const RightContentStyle = styled.div`
  right: 0;
  animation: ${props => props.RightMenu ? 'right-menu-open' : 'right-menu-close'} 1s linear 1 forwards;
  //width: 10%;
  height: 100%;
  background-color: #808080;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px;
  z-index: 0;
`;


export default RightContentStyle;