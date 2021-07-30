import React from "react";
import  NavBarStyle from "./NavBarStyle"


class NavBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
        };
      }

      async api(ip,port,command) {
        // GET request using fetch with async/await
        const response = await fetch("http://"+ip+":"+port+command);
        const data = await response.json();
        return data
      }

      hendlerOnClick =(e)=>{
        this.api("localhost","5000","/api/phones")
        .then((results) =>{
          console.log(results)
        })
          
      }

      render() {
        return (
        <NavBarStyle>
            <a onClick={this.props.hendlerOnClickLeft}>Открыть левое меню </a>
            <a onClick={this.hendlerOnClick}> Open</a>
            <h3>NavBar</h3>
            <a onClick={this.props.hendlerOnClickRight}>Открыть правое меню </a>
        </NavBarStyle>
        )
      }
}


export default NavBar;