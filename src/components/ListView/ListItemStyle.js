import styled from 'styled-components'

// Create a Title component that'll render an <h1> tag with some styles
const ListItemStyle = styled.div`
  background-color: transparent;
  //box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px;
  box-shadow: ${props => props.isSelected ? 'rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px;' 
  : ''};
  //padding-bottom: 5px;
  //height: 50px;
  color: ${props => props.isSelected ? 'white' : 'white'};
  border-bottom: 1px solid #D0D0D0;
  display: flex;
  background: ${props => props.isSelected ? '#808080' : 'transparent'} //'#666666'
`;


export default ListItemStyle;