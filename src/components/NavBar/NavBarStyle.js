import styled from 'styled-components'

// Create a Title component that'll render an <h1> tag with some styles
const NavBarStyle = styled.div`
  width: 100%;
  height: 4%;
  background-color: #333333;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px;
  z-index: 999;
  position: relative;
  display: flex;
  justify-content: space-between;
`;


export default NavBarStyle;