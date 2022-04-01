import React,{useState} from 'react'

import IDataCardSection from '../Data/IDataCardSection'
import IDataOrderItem from '../Data/IDataOrderItem'
import Divider from '@material-ui/core/Divider';
import IDataCardVSM from '../Data/IDataCardVSM';
import Paper from '@material-ui/core/Paper'
import ViewItemSection from './ViewItemSection'
import IDataOrder from '../Data/IDataOrder';
import IDataOrderPart from '../Data/IDataOrderPart';
import { SectionLogic_view } from '../Data/IDataOrder/IDataOrder';



const ViewOrderCard =  (props: {sectionLogic_views : SectionLogic_view[], orderProduct?:IDataOrderPart}) => {
    //const [BDitems, setBDItem] = useState<IDataOrderItem[]>();

    
    let flagParalel = false;
    let flagMaxInSectionItems = 0 as number;
    
    props.sectionLogic_views.map((item : SectionLogic_view,index: number) =>
      {
         if(item.sectionEtap_views.length > flagMaxInSectionItems )
         {
            flagMaxInSectionItems = item.sectionEtap_views.length 
         }

         if(item.sectionEtap_views.length > 1)
         {
            flagParalel = true;
         }
      }
    )
    
    let card = props.sectionLogic_views.map((item : SectionLogic_view,index: number) =>
         <ViewItemSection key={index} orderProduct={props.orderProduct} sectionEtap_views={item.sectionEtap_views} numberSection={index} lastSection={props.sectionLogic_views.length} flagParalel={flagParalel} flagMaxInSectionItems={flagMaxInSectionItems}/>
    )


    return(
       <div style={{display: 'grid', justifyContent: 'center', gridTemplateColumns: 'repeat('+props.sectionLogic_views.length+',1fr)'}}>
          {card}
       </div>
    )

}


export default ViewOrderCard;