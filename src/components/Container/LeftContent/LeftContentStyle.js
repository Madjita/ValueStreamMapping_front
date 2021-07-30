import styled from 'styled-components'

// Create a Title component that'll render an <h1> tag with some styles
const ContainerStyle = styled.div`
  //position: absolute;
  //width: 20%;
  animation: ${props => props.LeftMenu ? 'left-menu-open' : 'left-menu-close'} 1s linear 1 forwards;
  height: 100%;
  display: flex;
  background-color: #b3b3b3;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px;
  z-index: 0;
`;


export default ContainerStyle;