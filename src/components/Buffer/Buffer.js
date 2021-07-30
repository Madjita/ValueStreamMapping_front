import React from "react"
import styled from 'styled-components'

import BufferStyle from "./BufferStyle"
import Triangle from "../SVG/Triangle/Triangle"


// Create a Title component that'll render an <h1> tag with some styles
const HeaderStyle = styled.div`
  //box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 14px 0px;
  //display: flex;
  //position: absolute;
  width: 100%;
  word-wrap: break-word;
  border: 1px solid #808080;
  
`;

const LeftContentStyle = styled.div`
  width: 150px;
`;

const CurrentConentStyle = styled.div`
  display: flex;
  margin: 0 -5px;
  //justify-content: space-between;
`;

const CurrentConentIndexStyle = styled.div`
  background: #808080;
  color: white;
  width: calc(100%/5);
  border: 1px solid #808080;
  align-self: center;
  word-wrap: true;
  flex: 1 1 auto;
  margin: 0px 5px;
`;

const CurrentConentOrderStyle = styled.div`
  //display: flex;
  //justify-content: space-between;
`;


class Buffer extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          position: {
            x: this.props.x !== undefined ? this.props.x : 0,
            y: this.props.y !== undefined ? this.props.y : 0
          },

          list: this.props.list !== undefined ? this.props.list : [],
          currentItem: this.props.currentItem !== undefined ? this.props.currentItem : "",

          triangle: {
              min: this.props.triangle.min !== undefined ? this.props.triangle.min :  0,
              max: this.props.triangle.min !== undefined ? this.props.triangle.max :  100,
              value: this.props.triangle.min !== undefined ? this.props.triangle.value :  0,
          }

        };
      }

      render() {
        const {position,triangle} = this.state
        return (
         <BufferStyle position={position}>
             <Triangle   left={0} top={0} width={100} height={100} min={triangle.min} max={triangle.max} value={triangle.value} style={{border: '1px solid rgb(208, 208, 208)'}}/>
              <LeftContentStyle >
                    <HeaderStyle>
                        <p>Первый в очереде</p>
                    </HeaderStyle>
                    <CurrentConentStyle>
                        <CurrentConentIndexStyle>
                            <p>1</p>
                       </CurrentConentIndexStyle>
                       <div style={{flex: '1 1 auto',margin: '0 5px'}}> 
                            <CurrentConentOrderStyle>
                                <p>Велосипеды</p>
                                <p>25шт</p>
                            </CurrentConentOrderStyle>
                            <CurrentConentOrderStyle>
                                <p>Время ожидания</p>
                                <p>55 секунд</p>
                            </CurrentConentOrderStyle>
                       </div>
                    </CurrentConentStyle> 
                    <HeaderStyle>
                        <p>Выбран</p>
                    </HeaderStyle> 
                    <CurrentConentStyle>
                        <CurrentConentIndexStyle>
                            <p>125</p>
                       </CurrentConentIndexStyle>
                       <div style={{flex: '1 1 auto',margin: '0 5px'}}> 
                            <CurrentConentOrderStyle>
                                <p>Велосипеды</p>
                                <p>22 шт</p>
                            </CurrentConentOrderStyle>
                            <CurrentConentOrderStyle>
                                <p>Время ожидания</p>
                                <p>3241 сек</p>
                            </CurrentConentOrderStyle>
                       </div>
                    </CurrentConentStyle>  
              </LeftContentStyle>
              
         </BufferStyle>
        )
      }
}


export default Buffer;