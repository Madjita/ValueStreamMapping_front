import React from 'react';

import CheckboxStyle from "./CheckboxStyle"

const Checkbox = props => {
    return (
      <CheckboxStyle>
        <input
            type="checkbox"
            id={"chbx_" + props.MyKey}
            checked={props.checked}
            onChange={props.onPress}
        />
        <label style={{
            width: "100%",
            height: "100%",
        }}
        onClick = {props.onPress}
        >
          {props.title} {/*&nbsp;*/}
        </label>
       
      </CheckboxStyle>
    );
  };


export default Checkbox;
  