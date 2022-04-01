import React from 'react'
import IDataCardVSM from '../Data/IDataCardVSM'
import IDataOrderItem from '../Data/IDataOrderItem'
import IDataBufferVSM from '../Data/IDataBufferVSM'
import IDataEtapVSM from '../Data/IDataEtapVSM'

import Buffer from './Buffer'
import Etap from './Etap'

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import IDataOrder from '../Data/IDataOrder'
import IDataOrderPart from '../Data/IDataOrderPart'
import { Buffer_view, Etap_view, OrderProduction_view, SectionEtap_view } from '../Data/IDataOrder/IDataOrder'

const ViewItemSectionNew = (props:{sectionEtap_views: SectionEtap_view[],order?: OrderProduction_view, orderProduct?: IDataOrderPart, numberSection: number, lastSection: number, flagParalel: boolean,flagMaxInSectionItems: number}) =>
{
  console.log("props.sectionEtap_views = ",props.sectionEtap_views);

  if(props.sectionEtap_views.length < 0 )
  {
    return <div></div>
  }

  const listSections = props.sectionEtap_views.map((item : SectionEtap_view, index: number,) =>{

    let flag = props.flagParalel && props.sectionEtap_views.length <= props.flagMaxInSectionItems-1 && index == 0;
    let delta = props.sectionEtap_views.length;
    let percentPadding = (props.flagMaxInSectionItems-delta)*50 as any;
    if(props.sectionEtap_views.length === props.flagMaxInSectionItems)
    {
      percentPadding = 0;
    }

    return (
    <div key={index} style={{display: 'block ruby', paddingTop: flag ? (percentPadding+'%') as string: '', marginBottom: props.sectionEtap_views.length < 2 ? '':'50px'}}>
      <Buffer buffer={item.buffer_view as Buffer_view} orderProduct={props.order as OrderProduction_view}/>
      <div style={{verticalAlign: 'middle'}}>
        <ArrowRightAltIcon style={{width: '50px', height: '100%'}}/>
      </div>
      <Etap etap={item.etap_view as Etap_view} orderProduct={props.order as OrderProduction_view}/>
      {props.numberSection !==  props.lastSection ? 
                                                      <div style={{verticalAlign: 'middle'}}>
                                                        <ArrowRightAltIcon style={{width: '50px', height: '100%'}}/>
                                                      </div>
                                                  :
                                                      null
      }
    </div>)
  })

 
 

  return(
    <div style={{display: listSections.length < 1 ?'block ruby': '', border: '2px dashed #cec9c9', marginRight: '20px', padding: '50px'}}>
        {listSections}
    </div>
  )
}

export default ViewItemSectionNew;