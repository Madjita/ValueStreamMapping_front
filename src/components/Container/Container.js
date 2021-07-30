import React from "react";
import  ContainerStyle from "./ContainerStyle"

import LeftContent from "./LeftContent/LeftContent"
import MidleContainer from "./MidleContainer/MidleContainer"
import RightContent from "./RightContent/RightContent"



import ListActiveContextProvider from "../../ListActiveContextProvider";

//import {MidleContentContextProvider} from "../../providers/MidleContextProvider"

class Container extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
      }



      render() {
        return (
            <ContainerStyle>
              <ListActiveContextProvider>
                  <LeftContent LeftMenu={this.props.LeftMenu}/>
                  <MidleContainer />
                  <RightContent RightMenu={this.props.RightMenu}/>
              </ListActiveContextProvider>
            </ContainerStyle>
        )
      }
}


export default Container;