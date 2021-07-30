import React from "react";
import MidleContainerStyle from "./MidleContainerStyle"

import MidleContent from "./MidleContent/MidleContent"
import BottomContent from "./BottomContent/BottomContent"

class MidleContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
      }


      render() {
        return (
            <MidleContainerStyle>
              <MidleContent/>
              <BottomContent/>
            </MidleContainerStyle>
        )
      }
}


export default MidleContainer;