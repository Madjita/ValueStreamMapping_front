import React from 'react';

import Checkbox from "./CheckBox"

import  {ListActiveConxtext} from "../../ListActiveContextProvider"


let ListActive = [];

class CheckboxList extends React.PureComponent {
    constructor(props) {
      super(props);
  
      this.state = {
        updateList: props.updateList,
        list: [
          { choice_id: 1, choice_name: "bluetooth", isChecked: false, isSelected: false },
          { choice_id: 2, choice_name: "wifi", isChecked: false, isSelected: false  },
          { choice_id: 3, choice_name: "hotspot", isChecked: false, isSelected: false },

          { choice_id: 4, choice_name: "bluetooth", isChecked: false, isSelected: false },
          { choice_id: 5, choice_name: "wifi sadfsadf sdf sdfs d fsdf ", isChecked: false, isSelected: false},
          { choice_id: 6, choice_name: "hotspot", isChecked: false, isSelected: false },

          { choice_id: 7, choice_name: "bluetooth", isChecked: false, isSelected: false },
          { choice_id: 8, choice_name: "wifi", isChecked: false, isSelected: false },
          { choice_id: 9, choice_name: "hotspot", isChecked: false, isSelected: false },

          { choice_id: 10, choice_name: "bluetooth", isChecked: false, isSelected: false },
          { choice_id: 11, choice_name: "wifi", isChecked: false, isSelected: false },
          { choice_id: 12, choice_name: "hotspot", isChecked: false, isSelected: false },

          { choice_id: 13, choice_name: "bluetooth", isChecked: false, isSelected: false },
          { choice_id: 14, choice_name: "wifi", isChecked: false, isSelected: false },
          { choice_id: 15, choice_name: "hotspot", isChecked: false, isSelected: false },

          { choice_id: 16, choice_name: "bluetooth", isChecked: false, isSelected: false },
          { choice_id: 17, choice_name: "wifi", isChecked: false, isSelected: false },
          { choice_id: 18, choice_name: "hotspot", isChecked: false, isSelected: false },

         /* { choice_id: 19, choice_name: "bluetooth", isChecked: false },
          { choice_id: 20, choice_name: "wifi", isChecked: false },
          { choice_id: 21, choice_name: "hotspot", isChecked: false },

          { choice_id: 22, choice_name: "bluetooth", isChecked: false },
          { choice_id: 23, choice_name: "wifi sadfsadf sdf sdfs d fsdf ", isChecked: false },
          { choice_id: 24, choice_name: "hotspot", isChecked: false },

          { choice_id: 25, choice_name: "bluetooth", isChecked: false },
          { choice_id: 26, choice_name: "wifi", isChecked: false },
          { choice_id: 27, choice_name: "hotspot", isChecked: false },

          { choice_id: 28, choice_name: "bluetooth", isChecked: false },
          { choice_id: 29, choice_name: "wifi", isChecked: false },
          { choice_id: 30, choice_name: "hotspot", isChecked: false },

          { choice_id: 31, choice_name: "bluetooth", isChecked: false },
          { choice_id: 32, choice_name: "wifi", isChecked: false },
          { choice_id: 33, choice_name: "hotspot", isChecked: false },

          { choice_id: 34, choice_name: "bluetooth", isChecked: false },
          { choice_id: 35, choice_name: "wifi", isChecked: false },
          { choice_id: 36, choice_name: "hotspot", isChecked: false },

          { choice_id: 37, choice_name: "bluetooth", isChecked: false },
          { choice_id: 38, choice_name: "wifi", isChecked: false },
          { choice_id: 39, choice_name: "hotspot", isChecked: false },

          { choice_id: 40, choice_name: "bluetooth", isChecked: false },
          { choice_id: 41, choice_name: "wifi sadfsadf sdf sdfs d fsdf ", isChecked: false },
          { choice_id: 42, choice_name: "hotspot", isChecked: false },

          { choice_id: 43, choice_name: "bluetooth", isChecked: false },
          { choice_id: 44, choice_name: "wifi", isChecked: false },
          { choice_id: 45, choice_name: "hotspot", isChecked: false },

          { choice_id: 46, choice_name: "bluetooth", isChecked: false },
          { choice_id: 47, choice_name: "wifi", isChecked: false },
          { choice_id: 48, choice_name: "hotspot", isChecked: false },

          { choice_id: 49, choice_name: "bluetooth", isChecked: false },
          { choice_id: 50, choice_name: "wifi", isChecked: false },
          { choice_id: 51, choice_name: "hotspot", isChecked: false },

          { choice_id: 52, choice_name: "bluetooth", isChecked: false },
          { choice_id: 53, choice_name: "wifi", isChecked: false },
          { choice_id: 54, choice_name: "hotspot", isChecked: false }*/
        ]
      };
    }

    

    _setActiveList(clonedList,i)
    {
      if(ListActive !== undefined)
      {
        let index = ListActive.indexOf(clonedList[i])
        if(index === -1)
        {
          if(clonedList[i].isChecked)
          {
            ListActive.push(clonedList[i])
          }
        }
        else
        {
          if(clonedList[i].isChecked)
          {
            ListActive[index].isChecked = clonedList[i].isChecked
            ListActive[index].isSelected = false
          }
          else
          {
              ListActive[index].isSelected = false
              ListActive.splice(index, 1);
          }
        }
      }
    }
  
    _showChoices = (context) => {
      return this.state.list.map((item, i) => {
        return (
            <Checkbox
              title={item.choice_name}
              checked={item.isChecked}
              size={50}
              onIconPress={() => {}}
              onPress={() => {
                let clonedList = this.state.list.slice();
                clonedList[i].isChecked = !clonedList[i].isChecked;
                this.setState({ list: clonedList });

                this._setActiveList(clonedList,i)
                context.toggle(ListActive)
              
              }}
              key={item.choice_id}
              MyKey = {item.choice_id}
            />
        );
      });
    };
  
    render() {
      return (
        <div>
          <ListActiveConxtext.Consumer>
          {context => (
            <ul>{this._showChoices(context)}</ul>
          )}
          </ListActiveConxtext.Consumer>
        </div>
      );
    }
  }
  
  export default CheckboxList;