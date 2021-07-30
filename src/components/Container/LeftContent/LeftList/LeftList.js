import React from "react";
import LeftListStyle from "./LeftListStyle"

//import CheckboxList from "../../../CheckBox/CheckBoxList"

import CardAddOrder from "../../../CardAddOrder/CardAddOrder"

class LeftList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          ListCard: [{}]/*[{
                id: 0,
                name: "Велосипед"
              },
              {
                id: 1,
                name: "Самокат"
              }]*/
        };
      }

      async api(ip,port,command) {
        // GET request using fetch with async/await
        const response = await fetch("http://"+ip+":"+port+command);
        const data = await response.json();
        return data
      }

      componentDidMount()
      {
        let list = this.api('127.0.0.1','5000','/api/production')
        .then((ListCard) =>{
          console.log("list = ",ListCard)
          this.setState({ListCard: ListCard});
        })
      
      }


      OutputList = () => {
        return this.state.ListCard.map((item,index) => {
          return <CardAddOrder key={item.id} Id={item.id} Title={item.name} handleAdd={this.props.handleAdd}/>;
        })
      }


      render() {
        return (
            <LeftListStyle>
             {this.OutputList()}
                {/*<CheckboxList/>*/}
            </LeftListStyle>
        )
      }
}


export default LeftList;