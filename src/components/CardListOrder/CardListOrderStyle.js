import styled from 'styled-components'

// Create a Title component that'll render an <h1> tag with some styles
const CardListOrderStyle = styled.div`
  border: 1px solid transparent;
  padding: 0;
  margin: 0px 5px 0px 5px;
  margin-top: 10%;
  color: black;
  //width: 20%;
  //height: 100%;
  //display: flex;
  //background-color: #b3b3b3;
  //box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px;
  box-shadow: ${props => props.focus ? "blue 0px 3px 5px -1px, blue 0px 6px 10px 0px, blue 0px 1px 14px 0px":
  "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px"}

`;


export default CardListOrderStyle;