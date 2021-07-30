
import React, { Component } from "react";
const MidleContentContext = React.createContext();



let Provider = MidleContentContext.Provider
let Consumer = MidleContentContext.Consumer

class MidleContentContextProvider extends Component {
  state = {
    activeObject: {
      id: 0,
      name: ""
    }
  };

  toggle = (object) => {
    this.setState({activeObject: object});
  };

  render() {
    return (
      <Provider
        value={{ activeObject: this.state.activeObject, toggle: this.toggle }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export {MidleContentContext, MidleContentContextProvider, Consumer as MidleContentConsumer};


