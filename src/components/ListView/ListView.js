import React from 'react';

import ListItem from "./ListItem"

import  {ListActiveConxtext} from "../../ListActiveContextProvider"

//import  {MidleContentContext,MidleContentConsumer} from "../../providers/MidleContextProvider"

class ListView extends React.PureComponent {
    constructor(props) {
      super(props);
      this.escFunction = this.escFunction.bind(this);
      this.state = {
        selected: false,
      }
    }

    static contextType = ListActiveConxtext
    //static contextMidleContent = MidleContentContext

    _updateListView()
    {
      this.setState({ selected: !this.state.selected});
    }

    _showChoices = () => {

      //this.contextMidleContent = contextMidleContent //Инициализация Context в Middle

      return this.context.ListActive.map((item, i) => {
        return (
            <ListItem
                title={item.choice_name}
                checked={item.isChecked}
                size={50}
                onIconPress={() => {}}
                onPress={() => {

                  this.context.ListActive.forEach((item2,j) =>{
                    item2.isSelected = false;
                  });
                  item.isSelected = true;
                  this._updateListView()

                  //this.contextMidleContent.toggle({id:0,name:item.choice_name}) //Передача данных по Context в Middle

                }}
                isSelected={this.context.ListActive[i].isSelected}
                key={item.choice_id}
                MyKey = {item.choice_id}
            />
        );
      });
    };

    escFunction(event){
      
      let list = this.context.ListActive;
      let object = list.find(item => item.isSelected === true)

      if(object === undefined)
      {
        if(list.length > 0)
        { 
          list[0].isSelected = true;
          //this.contextMidleContent.toggle({id:0,name:list[0].choice_name}) //Передача данных по Context в Middle
          this._updateListView()
        }

        return;
      }
      let position = list.indexOf(object)
      
      switch(event.keyCode)
      {
        case 38:
        {
            if(position-1 < 0)
            {
              break;
            }
          
            if(position < list.length )
            {
              object.isSelected = false;
              list[position-1].isSelected = true;
              //this.contextMidleContent.toggle({id:0,name:list[position-1].choice_name}) //Передача данных по Context в Middle
            }
            else
            {
              object.isSelected = false;
            }
            this._updateListView()
            break;
        }

        case 40:
        {

            if(position+1 >= list.length)
            {
              break;
            }

            if(position < list.length)
            {
              object.isSelected = false;
              list[position+1].isSelected = true;
              //this.contextMidleContent.toggle({id:0,name:list[position+1].choice_name}) //Передача данных по Context в Middle
            }
            else
            {
              object.isSelected = false;
            }
            this._updateListView()
          break;
        }
        default:
          break;
      }

      
      
    }
    componentDidMount(){
      console.log("componentDidMount")
      document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount(){
      console.log("componentWillUnmount")
      document.removeEventListener("keydown", this.escFunction, false);
    }

    render() {
      return (
        <div>
          <ListActiveConxtext.Consumer>
          {context => (
            <ul>{this._showChoices()}</ul>
          )}
          </ListActiveConxtext.Consumer>
        </div>
      );
    }
  }

  export default ListView;