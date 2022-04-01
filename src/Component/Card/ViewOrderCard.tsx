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

/*
interface productionCardVSM{
    name: string,
    productions: IDataCardVSM[]
}
interface IDataCardProduct{
    cardVSMs: productionCardVSM[]
}*/


const ViewOrderCard =  (props: {order: OrderMy}) => {
    const [BDitems, setBDItem] = useState<IDataOrderItem[]>();

    const {cardVSMs, loading} = useTypedSelector(state => state.cardVSM);
    const {cardVSMLoading} = useActionCardVSM()

    const [card, setCard] = useState(cardVSMs);
/*
useEffect(() => {
    const timer = setTimeout(() => cardVSMLoading(props.order), 1000); 
    return () => {
      clearTimeout(timer);
      //console.log("timer ", orders);
    };  
   // console.log("cardVSMLoading useEffect" + props.order.name);
    //console.log("cardVSMLoading " + props.order.name);
},[cardVSMs]) //orders

//console.log("rerender ViewOrderCard")
//return <p>;o</p>;

if(loading)
{
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
    )
}
*/
    let listProduct = props.order.cards.map((item: MyCards, index: number)=>{
        

        //let orderItemsFind = props.order.orders_production.filter(o=> o.production.name == item.name)



       /* let orderItems = null;
        if(orderItemsFind.length > 0)
        {
            orderItems = orderItemsFind[0].orders_production_items;
        }
        console.log(orderItems)
        */

        let cardSections = new Array as IDataCardSection[];

       
        let etapSection = new Array as IDataCardVSM[];

        for (let index = 0; index < item.sections.length; index++) 
        {
            const element = item.sections[index];

            if(index === 0)
            {
                etapSection.push(element);
            }
            else
            {
                if(element.etapNumeric === etapSection[0].etapNumeric)
                {
                    etapSection.push(element);
                }
                else
                {
                    let cardSection = new Object as IDataCardSection;
                    cardSection.sections = etapSection.slice()
                    cardSections.push(cardSection);

                    etapSection = new Array as IDataCardVSM[];

                    etapSection.push(element);
                }
            }

        }

        let cardSection = new Object as IDataCardSection;
        cardSection.sections = etapSection.slice()
        cardSections.push(cardSection);


        return(
            <Card key={index} sx={{marginBottom: '150px'}}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <SettingsIcon />
                        </IconButton>
                    }
                    title={'\"'+item.name + '\" | Количество: '+props.order.order.orders_production[index].quantity}
                    sx={{fontWeight: 'bold',color: 'white', backgroundColor: '#575757'}}
                    style={{color: 'white'}}
                >
                    
                </CardHeader>
                <CardContent sx={{backgroundColor: 'rgba(0, 0, 0, .03)'}}>
                    {/*<ViewCard sections={cardSections} orderProduct={props.order.order.orders_production[index]}/> */}
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


export default ViewOrderCard;