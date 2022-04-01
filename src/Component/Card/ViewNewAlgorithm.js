import React from 'react';
import {MapInteractionCSS } from 'react-map-interaction';
import ViewOrderCardNew from './ViewOrderCardNew'

class ViewNewAlgorithm extends React.Component{
  constructor(props)
  {
    super(props);

  }



  render()
  {
    return (
      <MapInteractionCSS defaultValue={{scale: 0.5,translation : {x : 0,y: 0}}} >
          <ViewOrderCardNew order={this.props.item}/>
      </MapInteractionCSS>
    );
  }
}
//<div style={{width: '200px', height: '400px', backgroundColor: 'red'}}></div>
// 
export default ViewNewAlgorithm;

//scale: 0.25,translation : {x : 50,y: 250}}