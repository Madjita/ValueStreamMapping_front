
import React, { Component } from "react";
export const ListActiveConxtext = React.createContext();



class ListActiveContextProvider extends Component {
  state = {
    ListActive: []
  };

  toggle = (list) => {
    this.setState({ListActive: list});
  };

  render() {
    return (
      <ListActiveConxtext.Provider
        value={{ ListActive: this.state.ListActive, toggle: this.toggle }}
      >
        {this.props.children}
      </ListActiveConxtext.Provider>
    );
  }
}

export default ListActiveContextProvider;


