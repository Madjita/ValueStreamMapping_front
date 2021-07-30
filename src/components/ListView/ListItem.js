import React from 'react';

import ListItemStyle from "./ListItemStyle"

const ListItem = props => {
    return (
      <ListItemStyle isSelected={props.isSelected}>
        <label style={{
            width: "100%",
            height: "100%",
        }}
        onClick = {props.onPress}
        >
          {props.title} {/*&nbsp;*/}
        </label>
       
      </ListItemStyle>
    );
  };


export default ListItem;
  