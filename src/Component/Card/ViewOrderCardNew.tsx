import React,{useEffect, useState} from 'react'

import IDataCardSection from '../Data/IDataCardSection'
import IDataOrderItem from '../Data/IDataOrderItem'
import Divider from '@material-ui/core/Divider';
import ViewCard from './ViewCard'

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@material-ui/system';


import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';

import IDataVSM from '../Data/IDataVSM'
import IDataProduction from '../Data/IDataProduction';
import IDataCardVSM from '../Data/IDataCardVSM';
import { useCardVSMActionType, useProductionCardVSM } from '../../type/useCardVSMType';

import { useActionCardVSM } from '../../hooks/useActionCardVSM';
import { useTypedSelector } from '../../hooks/leftMenuSelector';
import IDataOrder from '../Data/IDataOrder';
import { MyCards, OrderMy } from '../../type/useOrdersType';
import Order_view, { OrderProduction_view } from '../Data/IDataOrder/IDataOrder';
import ViewCardNew from './ViewCardNew';

/*
interface productionCardVSM{
    name: string,
    productions: IDataCardVSM[]
}
interface IDataCardProduct{
    cardVSMs: productionCardVSM[]
}*/


const ViewOrderCardNew =  (props: {order: Order_view}) => {
    const [BDitems, setBDItem] = useState<IDataOrderItem[]>();

    const {cardVSMs, loading} = useTypedSelector(state => state.cardVSM);
    const {cardVSMLoading} = useActionCardVSM()

    const [card, setCard] = useState(cardVSMs);


    let listProduct = props.order.orderProduction_views.map((item: OrderProduction_view, index: number)=>{

        return(
            <Card key={index} sx={{marginBottom: '150px'}}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <SettingsIcon />
                        </IconButton>
                    }
                    title={'\"'+item.name + '\" | Количество: '+item.orderProductionItems.length}
                    sx={{fontWeight: 'bold',color: 'white', backgroundColor: '#575757'}}
                    style={{color: 'white'}}
                >
                    
                </CardHeader>
                <CardContent sx={{backgroundColor: 'rgba(0, 0, 0, .03)'}}>
                    <ViewCardNew sectionLogic_views={item.card_View.sectionLogic_views} orderProduct={item}/>
               </CardContent>
            </Card>

        )
    })

    return(
       <div>
           {listProduct}
       </div>
    )
    
}


export default ViewOrderCardNew;