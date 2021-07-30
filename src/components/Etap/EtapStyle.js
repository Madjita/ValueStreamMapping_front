import styled from 'styled-components'

// Create a Title component that'll render an <h1> tag with some styles
const BufferStyle = styled.div`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px;
  //display: flex;
  position: absolute;
  left: ${props => props.position.x+"px"};
  top: ${props => props.position.y+"px"};
  font-size: 12px;
`;


export default BufferStyle;