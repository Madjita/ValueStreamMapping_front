import './App.css';
import React from "react"

import NavBar from "./components/NavBar/NavBar"
import Container from "./components/Container/Container"

import AppStyle from "./AppStyle"

class App extends React.PureComponent{
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        LeftMenu: false,
        RightMenu: false,

      };
    }

    hendlerOnClickLeft=(e)=>
    {
      this.setState({LeftMenu: !this.state.LeftMenu})
    }

    hendlerOnClickRight=(e)=>
    {
      this.setState({RightMenu: !this.state.RightMenu})
    }


    render() {
      const {LeftMenu,RightMenu} = this.state
      return (
      <AppStyle className="App">
        <NavBar hendlerOnClickLeft={this.hendlerOnClickLeft} hendlerOnClickRight={this.hendlerOnClickRight}/>
        <Container LeftMenu={LeftMenu} RightMenu={RightMenu}/>
      </AppStyle>
      )
    }
}


export default App;

