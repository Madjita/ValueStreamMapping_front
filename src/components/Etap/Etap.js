import React from "react"
import styled from 'styled-components'

import Time from '../Time/Time'

import EtapStyle from "./EtapStyle"



const EtapHeaderStyle = styled.div`
`;

const CycleTimeContentStyle = styled.div`
    display: flex;
`;


const CycleTimeContentActyaleStyle = styled.div`
    width: 50%;
    border: 1px solid #808080;
`;

const CycleTimeContentDefaultStyle = styled.div`
    width: 50%;
    border: 1px solid #808080;
`;




class Etap extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          name: this.props.name !== undefined ? this.props.name : "Title",
          position: {
            x: this.props.x !== undefined ? this.props.x : 0,
            y: this.props.y !== undefined ? this.props.y : 0
          },

          /*list: this.props.list !== undefined ? this.props.list : [],
          currentItem: this.props.currentItem !== undefined ? this.props.currentItem : "",

          triangle: {
              min: this.props.triangle.min !== undefined ? this.props.triangle.min :  0,
              max: this.props.triangle.min !== undefined ? this.props.triangle.max :  100,
              value: this.props.triangle.min !== undefined ? this.props.triangle.value :  0,
          }*/

        };
      }

      render() {
        const {position,triangle} = this.state
        return (
         <EtapStyle position={position}>
             <EtapHeaderStyle>
                 <p>{this.state.name}</p>
             </EtapHeaderStyle>
             <div>
                <div style={{border: '1px solid black'}}>
                    <p>Время цила</p>
                </div>
                <CycleTimeContentStyle>
                    <CycleTimeContentActyaleStyle>
                        <div style={{borderBottom: '1px solid black'}}>
                            <p>Актуальное</p>
                        </div>
                        <Time padding={5}/>
                    </CycleTimeContentActyaleStyle>
                    <CycleTimeContentDefaultStyle>
                        <div style={{borderBottom: '1px solid black'}}>
                            <p>Идеальное</p>
                        </div>
                        <Time padding={5}/>
                    </CycleTimeContentDefaultStyle>
                </CycleTimeContentStyle>
             </div>

             <div>
                <div style={{border: '1px solid black'}}>
                    <p>Время Подготовки</p>
                </div>
                <CycleTimeContentStyle>
                    <CycleTimeContentActyaleStyle>
                        <div style={{borderBottom: '1px solid black'}}>
                            <p>Актуальное</p>
                        </div>
                        <Time padding={5}/>
                    </CycleTimeContentActyaleStyle>
                    <CycleTimeContentDefaultStyle>
                        <div style={{borderBottom: '1px solid black'}}>
                            <p>Идеальное</p>
                        </div>
                        <Time padding={5}/>
                    </CycleTimeContentDefaultStyle>
                </CycleTimeContentStyle>
             </div>
         </EtapStyle>
        )
      }
}


export default Etap;