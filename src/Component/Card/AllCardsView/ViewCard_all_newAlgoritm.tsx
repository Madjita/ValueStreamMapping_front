import React,{useEffect, useState} from 'react'

import IDataCardSection from '../../Data/IDataCardSection'
import IDataOrderItem from '../../Data/IDataOrderItem'
import Divider from '@material-ui/core/Divider';
import ViewCard from '../ViewCard'

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@material-ui/system';


import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';

import IDataVSM from '../../Data/IDataVSM'
import IDataProduction from '../../Data/IDataProduction';
import IDataCardVSM from '../../Data/IDataCardVSM';
import { useCardVSMActionType, useProductionCardVSM } from '../../../type/useCardVSMType';

import { useActionCardVSM } from '../../../hooks/useActionCardVSM';
import { useTypedSelector } from '../../../hooks/leftMenuSelector';
import IDataOrder from '../../Data/IDataOrder';
import { MyCards, OrderMy } from '../../../type/useOrdersType';
import { Card_view, SectionLogic_view } from '../../Data/IDataOrder/IDataOrder';
import ChartLine from '../../Charts/ChartLine';



const ViewCard_all_newAlgoritm =  (props: {card_view: Card_view}) => {

    return(
        <div>
        {/*<div style={{height: "300px"}}>
            <ChartLine card_view={props.card_view}/>  
        </div> */} 
        <Card sx={{marginBottom: '150px'}}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <SettingsIcon />
                    </IconButton>
                }
                title={'\"'+props.card_view.name + '\"'}
                sx={{fontWeight: 'bold',color: 'white', backgroundColor: '#575757'}}
                style={{color: 'white'}}
            >
                
            </CardHeader>
            <CardContent sx={{backgroundColor: 'rgba(0, 0, 0, .03)'}}>
                <ViewCard sectionLogic_views={props.card_view.sectionLogic_views}/>
           </CardContent>
        </Card>
        </div>

    )


    
}


export default ViewCard_all_newAlgoritm;