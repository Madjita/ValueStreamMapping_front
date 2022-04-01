import React from 'react';
import {MapInteractionCSS } from 'react-map-interaction';
import ViewCard_all from './ViewCard_all'

class ViewAllCards extends React.Component{
  constructor(props)
  {
    super(props);

  }

  render()
  {
    return (
    <div style ={{width: '100%', height: '89vh'}}>
      <MapInteractionCSS defaultValue={{scale: 0.5,translation : {x : 0,y: 0}}}>
          {/*<ViewOrderCard data={this.props.sections} productionId={this.props.productionId}/> */}
          <ViewCard_all sectionsCard={this.props.item}/>
      </MapInteractionCSS>
    </div>
    );
  }
}

export default ViewAllCards;