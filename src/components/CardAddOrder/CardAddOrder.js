import React from "react";
import CardAddOrderStyle from "./CardAddOrderStyle"
import styled from 'styled-components'

const FocuseStyle = styled.li`
height: .25rem;
box-shadow: ${props => props.focus ? "0 .25rem 0 0 #ffcd1f":"0 1px 0 0 #D0D0D0"};
transition: all .12s cubic-bezier(.47,0,.745,.715);
`;

const ButtonAdd = styled.button`
border: none;
background-color: transparent;
color: white;
font-size: 18px;
animation: ${props => props.addClick ? "fade-in-keyframes 0.5s" : ""};
    @keyframes fade-in-keyframes {
        from {
            opacity: 0
        }
        to {
            opacity: 1
        }
    }
cursor: pointer;
    &:hover {
        background-color: lightgrey;
        color: black;
    }
`;

class CardAddOrder extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          handleAdd: this.props.handleAdd !== undefined ? this.props.handleAdd : this.Add,
          value: Math.floor(Math.random() * 100),
          focus: false,
          Title: this.props.Title !== undefined ?  this.props.Title :"Title",
          addClick: true
        };
      }


      CheckMin = (value,min) => {
        let flag = Number(value) < Number(min)
        return flag
      }

      ArrowDown = (input_object,count) => {
        let value = Number(input_object.value) - count;

        let flag_current = this.CheckMin(input_object.value,input_object.min)
        let flag_new = this.CheckMin(value,input_object.min)

        if(flag_current || flag_new )
        {
            input_object.value = input_object.min
        }
        else
        {
            input_object.value = value
        }

        this.setState({value: Number(input_object.value)})
        
     }

      handleLeftArrowDown = (e) => {
        let input_object = e.target.nextElementSibling;
        this.ArrowDown(input_object,1)
     }

     ArrowUP = (input_object,count) => {
        let value = Number(input_object.value) + count;

        let flag_current = this.CheckMin(input_object.value,input_object.min)
        let flag_new = this.CheckMin(value,input_object.min)

        if(flag_current || flag_new )
        {
            input_object.value = input_object.min
        }
        else
        {
            input_object.value = value
        }

        this.setState({value: Number(input_object.value)})

     }

     handleRightArrowUP = (e) => {
        let input_object = e.target.previousElementSibling; //this.previousElementSibling.previousElementSibling.stepDown()
        this.ArrowUP(input_object,1);
     }



    insert = (arr, index, ...newItems) => [
        // part of the array before the specified index
        ...arr.slice(0, index),
        // inserted items
        ...newItems,
        // part of the array after the specified index
        ...arr.slice(index)
      ]

     handleKeyDown = (e) => {
       switch(e.key)
       {
           case "Backspace":
            {
                e.preventDefault()
                var pos = e.target.selectionStart-1;

                let value_part1 = e.target.value.substring(0,pos)
                let value_part2 = e.target.value.substring(pos+1,e.target.value.length)

                let value = value_part1 + value_part2

                e.target.value = value
                e.target.setSelectionRange(pos, pos)
                this.setState({value: value})
               
               break;
           }
           
           case "ArrowUp":
           {
                e.preventDefault()
                this.ArrowUP(e.target,1);
                break;
           }
           case "ArrowDown":
           {
                e.preventDefault()
                this.ArrowDown(e.target,1)
                break;
           }
           case "Enter":
           case "Meta":
           case "Alt":
           case "Control":
           case "CapsLock":
           case "Shift":
           case "Tab":
           case "ArrowLeft":
           case "ArrowRight":
           {
               break;
           }
           default:
           {
                let flag = !(/\D/g.test(e.key)) 

                if(flag)
                {
                    e.preventDefault()
                    let pos = e.target.selectionStart;
                    e.target.value = this.insert(e.target.value,pos,e.key.toString()).join("")
                    e.target.setSelectionRange(pos+1, pos+1)

                    this.setState({value: Number(e.target.value)})
                }
                else
                {
                    e.target.value = this.state.value;
                }

               break;
           }
       }

    }

    Focus = () =>{
         this.setState({focus: true})
    }

    Blur = () =>{
        this.setState({focus: false})
    }

    handleChange = (e) => {

    }

    handleScroll = (e)=> {

        let count = (e.deltaY/17)

        switch (e.deltaY > 0) {
            case true:
              console.log('positive',e.deltaY,count);
              this.ArrowUP(e.target,count);
              break;
            default:
              console.log('negative',e.deltaY,count);
              count *=(-1)
              this.ArrowDown(e.target,count)
              
          }
          
    }

    Add = (e) => {
        this.setState({addClick: true})

        if(this.Add !== this.state.handleAdd)
            this.state.handleAdd(this.props.Id,this.state.Title,this.state.value);
    }

    handleAnimationEnd = (e) => {
        this.setState({addClick: false})
    }

   
      render() {
        return (
        
            <CardAddOrderStyle>
                <div style={{borderBottom: "1px solid #D0D0D0", display: "flex",flexDirection: "row", justifyContent: "center",direction: "ltr"}}>
                    <p style={{padding: "0",margin: "0",color:"white" }}>{this.state.Title}</p>
                </div>
                <div style={{display: "flex", direction:"ltr"}}>
                  <ul style={{ margin:"0"}}>
                    <span id="raz">
                        <span id="leftArrow" onClick={this.handleLeftArrowDown}></span>
                        <input style={{border: "none",  outline: "none", backgroundColor: "transparent", fontSize:"14px",width: "100%",textAlign: "center",padding:"0",color:"white" }} type="text" min="1" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} onFocus={this.Focus} onBlur={this.Blur} onWheel={this.handleScroll}/>
                        <span id="rightArrow" onClick={this.handleRightArrowUP}></span>
                    </span>

                    <FocuseStyle focus={this.state.focus}/>

                    <li style={{color:"#c3c7d5", textAlign: "inherit",fontWeight: "600",fontSize: ".75rem", letterSpacing: ".0625rem",lineHeight: "1.333333333333333",paddingTop:"3%"}}>
                          Количество
                    </li>
                  </ul>
                  <ButtonAdd  addClick={this.state.addClick}
                  onClick={this.Add} onAnimationEnd={this.handleAnimationEnd} >+</ButtonAdd>
                </div>
            </CardAddOrderStyle>
        )
      }
}


export default CardAddOrder;
