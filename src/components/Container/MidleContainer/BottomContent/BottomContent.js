import React from "react";
import BottomContentStyle from "./BottomContentStyle"

class BottomContent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
      }


      render() {
        return (
            <BottomContentStyle>
              <h3>BottomContent</h3>
            </BottomContentStyle>
        )
      }
}


export default BottomContent;