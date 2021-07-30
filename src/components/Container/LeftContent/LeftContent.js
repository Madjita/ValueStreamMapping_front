import React from "react";
import LeftContentStyle from "./LeftContentStyle"

import LeftList from "./LeftList/LeftList"

import LeftListActive from "./LeftListActive/LeftListActive"



class LeftContent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          ListActive: [],
          ListUpdate: false
        };
      }

      async api(ip,port,command) {
        // GET request using fetch with async/await
        const response = await fetch("http://"+ip+":"+port+command);
        const data = await response.json();
        return data
      }

      // Пример отправки POST запроса:
      async  postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
      }






     handleAdd = (id,title,count) => {
         
      let object = {
        "Production": {
          id: id,
          name: title
        },
        "Quantity": count
      }
        
        let result = this.postData('http://127.0.0.1:5000/api/order',object)

        let  ListActive  = JSON.parse(JSON.stringify(this.state.ListActive))   
        ListActive.push({title: title,count: count,focus: false})
        this.setState({ListActive: ListActive})
     }

     Select = (keyIndex) => {
      let  ListActive  = JSON.parse(JSON.stringify(this.state.ListActive))
      ListActive.forEach((item,index) =>{
        if(index === keyIndex)
        {
          item.focus = true;
        }
        else
        {
          item.focus = false;
        } 
      })
      this.setState({ListActive: ListActive})
    }

      render() {

        let {ListActive} = this.state
        return (
            <LeftContentStyle LeftMenu={this.props.LeftMenu}>
                <LeftList handleAdd={this.handleAdd} />
                <LeftListActive handleSelect={this.Select} ListActive={ListActive}/>
            </LeftContentStyle>
        )
      }
}


export default LeftContent;