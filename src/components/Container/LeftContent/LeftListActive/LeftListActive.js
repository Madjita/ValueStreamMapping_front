import React from "react";
import LeftListActiveStyle from "./LeftListActiveStyle"

//import ListActive from "./ListActive";

//import ListActive from "./ListActive"

import CardListOrder from "../../../CardListOrder/CardListOrder"

class LeftListActive extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          ListActive: [],
          Select: false,
          handleSelect: props.handleSelect,
        };
      }


      Test = () => {
        return this.state.ListActive.map((item,index) =>{
          return <CardListOrder key={index} index={index} Title={item.title} count={item.count} focus={item.focus} handleSelect={this.state.handleSelect}/>
        })
      }

      static getDerivedStateFromProps(props, state) {
        if (props.ListActive !== state.ListActive) {  
          return {
            ListActive: props.ListActive,
          };
        }
        return null;
      }

      render() {
        return (
            <LeftListActiveStyle>
                {this.Test()}
                {/*<ListActive/>*/}
            </LeftListActiveStyle>
        )
      }
}
//<h3>LeftListActiveStyle</h3>


export default LeftListActive;