import React from "react";
import CardListOrderStyle from "./CardListOrderStyle"
import styled from 'styled-components'


import Time from "../Time/Time"

const ButtonAdd = styled.button`
width: 100%;
border: none;
background-color: transparent;
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
    }
`;



class CardListOrder extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
        
          index: this.props.index,
          Title: this.props.Title,
          count: this.props.count,
          focus: this.props.focus,
          addClick: true
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.Title !== state.Title) {
          return {
            Title: props.Title,
            count: props.count,
          };
        }
        return null;
    }

    handleAnimationEnd = (e) => {
        this.setState({addClick: false})
    }



    Select = (e) =>{
        if(e.target.tagName === "BUTTON")
            return ;
        this.props.handleSelect(this.props.index)
    }

    Sim = (e) => {
        this.setState({addClick: true})
    }



    render() {
        return (
            <CardListOrderStyle onClick={this.Select} focus={this.props.focus}>
                <div style={{borderBottom: "1px solid #D0D0D0", display: "flex",flexDirection: "row", justifyContent: "space-between",direction: "ltr", zIndex:"2"}}>
                    <p style={{padding: "0",margin: "0" }}>{this.state.Title}</p>
                    <p style={{padding: "0",margin: "0" }}>{this.state.count+"  шт"}</p>
                </div>
                <div>
                {/*<div style={{display: "flex", direction:"ltr", margin:"0",borderBottom: "1px solid rgb(208, 208, 208)"}}>
                    <TimeActual> Part 1</TimeActual>
                    <TimeActual> Part 2</TimeActual>
                </div>*/}
                <Time/>
                <ButtonAdd  addClick={this.state.addClick}
                onClick={this.Sim} onAnimationEnd={this.handleAnimationEnd} >Start Simulation</ButtonAdd>
                </div>
            </CardListOrderStyle>
        )
    }
}

export default CardListOrder;
