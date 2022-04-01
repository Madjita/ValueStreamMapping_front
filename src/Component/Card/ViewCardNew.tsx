import React,{useState} from 'react'

import IDataCardSection from '../Data/IDataCardSection'
import IDataOrderItem from '../Data/IDataOrderItem'
import Divider from '@material-ui/core/Divider';
import IDataCardVSM from '../Data/IDataCardVSM';
import Paper from '@material-ui/core/Paper'
import ViewItemSection from './ViewItemSection'
import IDataOrder from '../Data/IDataOrder';
import IDataOrderPart from '../Data/IDataOrderPart';
import { OrderProductionItem, OrderProduction_view, SectionEtap_view, SectionLogic_view } from '../Data/IDataOrder/IDataOrder';
import ViewItemSectionNew from './ViewItemSectionNew';



const ViewCardNew =  (props: {sectionLogic_views : SectionLogic_view[], orderProduct?:OrderProduction_view}) => {
    
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
         <ViewItemSectionNew key={index} sectionEtap_views={item.sectionEtap_views} order={props.orderProduct} numberSection={index} lastSection={props.sectionLogic_views.length} flagParalel={flagParalel} flagMaxInSectionItems={flagMaxInSectionItems}/>
    )


    return(
       <div style={{display: 'grid', justifyContent: 'center', gridTemplateColumns: 'repeat('+props.sectionLogic_views.length+',1fr)'}}>
          {card}
       </div>
    )

}


export default ViewCardNew;