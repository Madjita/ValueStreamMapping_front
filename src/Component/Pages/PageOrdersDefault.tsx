import { Grid } from '@material-ui/core';

import  React, { useEffect,useState } from 'react'
import CardOrderInDefault from '../Card/Pages/CardOrderInDefault';

import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import {IDataColorOrderInDefault} from '../Data/DataCardOrderInDefault/IDataColorOrderInDefault'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import { useActionOrders } from '../../hooks/useActionOrders';
import { useTypedSelector } from '../../hooks/leftMenuSelector';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@material-ui/system';
import IDataOrder from '../Data/IDataOrder';
import OrderRole from '../Data/OrderRole';

import DialogAddOrder from '../Dialog/DialogAddOrder'
import IDialogAddOrder from '../Data/Dialog/IDialogAddOrder'
import IDataProduction from '../Data/IDataProduction';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



const PageOrdersDefault = () =>
{
const {orders, loading} = useTypedSelector(state => state.orders);
const {ordersLoading,orderAdd} = useActionOrders()

useEffect(() => {
    const timer = setTimeout(() => ordersLoading(), 800);
    return () => {
      clearTimeout(timer);
    };   
},[orders]) //orders



const [newOrder,setOrder] = useState<IDialogAddOrder>();

const addOrder= (value : IDialogAddOrder) =>
{
    console.log("NEW = ", value)

    if(value.name == undefined)
    {
        return ;
    }
    orderAdd(value);
    ordersLoading();
}


const even = (n: number) => !(n % 2);

//Array.from(Array(10))
const listData =  orders.map((item: IDataOrder, index)=>{


    if(item === undefined)
    {
        return ;
    }

    let OrderColor = IDataColorOrderInDefault.NotWork;
    switch(item.orderRole)
    {
        case OrderRole.Actual:
            OrderColor = IDataColorOrderInDefault.NotWork
            break;
        case OrderRole.Work:
            OrderColor = IDataColorOrderInDefault.InWork
            break;
        case OrderRole.ArchiveGood:
            OrderColor = IDataColorOrderInDefault.DoneGood
            break;
        case OrderRole.ArchiveBad:
                OrderColor = IDataColorOrderInDefault.DoneBad
                break;
        default:
            break;
    }

   return (
       <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
           <CardOrderInDefault OrderColor={OrderColor} data={item}/>
       </Grid>
   )
})


if(loading)
{
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
    )
}



    return (
            <div>
            <DialogAddOrder addOrder={addOrder}/>
            <Box sx={{display: 'flex'}}>
                <Grid container spacing={2}>
                    {listData}
                </Grid>
            </Box>
            </div>
    ) 
}

export default PageOrdersDefault;

//xs={12} sm={6} md={4} lg={4} xl={3}
//xs={12} md={3}