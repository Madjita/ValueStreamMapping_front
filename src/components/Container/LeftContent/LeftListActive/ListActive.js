import React from "react";
import ListActiveStyle from "./ListActiveStyle"

import ListView from "../../../ListView/ListView"

class ListActive extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
      }


      render() {
        return (
            <ListActiveStyle>
                <ListView/>
            </ListActiveStyle>
        )
      }
}


export default ListActive;