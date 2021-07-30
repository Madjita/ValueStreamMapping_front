import React from "react";
import RightContentStyle from "./RightContentStyle"

class RightContent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
      }


      render() {
        return (
            <RightContentStyle RightMenu={this.props.RightMenu}>
              <h3>RightContent</h3>
            </RightContentStyle>
        )
      }
}


export default RightContent;