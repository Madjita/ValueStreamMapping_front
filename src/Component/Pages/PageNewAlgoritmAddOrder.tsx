import  React, { useEffect,useState,useRef } from 'react'
import axios from 'axios'
import serverApiHost,{port} from "../../global";

import { Grid } from '@material-ui/core';
import CardOrderInNewAlgoritmDefault from '../Card/Pages/CardOrderInNewAlgoritmDefault';

import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import {IDataColorOrderInDefault} from '../Data/DataCardOrderInDefault/IDataColorOrderInDefault'

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import { useActionOrders } from '../../hooks/useActionOrders';
import { useTypedSelector } from '../../hooks/leftMenuSelector';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@material-ui/system';
import IDataOrder from '../Data/IDataOrder';
import OrderRole from '../Data/OrderRole';

import DialogAddOrder from '../Dialog/DialogAddOrder'
import IDialogAddOrder from '../Data/Dialog/IDialogAddOrder'
import IDataProduction from '../Data/IDataProduction';



/////////////////////////////////
import Order_view from '../Data/IDataOrder/IDataOrder'
import DialogAddOrderNewAlgoritm from '../Dialog/DialogAddOrderNewAlgoritm';

import ToggleButtonMy from '../PageExample/ToggleButtonMy'
import TableView from '../PageExample/DemoArchive'

///////////////////////////////////

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



const PageNewAlgoritmAddOrder = () =>
{
//const {orders, loading} = useTypedSelector(state => state.orders);
//const {ordersLoading,orderAdd} = useActionOrders()


const [orders, SetOrders] = useState<Order_view[]>();
const [loading, SetLoading] = useState(true);

const [update, SetUpdate] = useState(false);

const ordersLoading = async () => {

    const response = await axios.get('http://'+serverApiHost+':'+port+'/api/cardVSM/getallOrdersInPrepair')

    if(response.status != 200)
    {
      return ;
    }

    let content = response.data as any;

    let ordersFromServer =  content.orders as Order_view[];
    SetOrders(ordersFromServer);
    //console.log("orders = ",orders,ordersFromServer )
    SetLoading(false);
    SetUpdate(true);
   // console.log("ordersLoading")
    SetUpdate(false);
}

const orderAdd = async (newOrder : IDialogAddOrder) =>{
    SetUpdate(true);

    console.log("SetUpdate")
    const response = await axios.post('http://'+serverApiHost+':'+port+'/api/cardVSM/addorderprepair',JSON.stringify(newOrder),{
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
        }
      })

    SetUpdate(false);
}

const isInitialMount = useRef(true);

useEffect(() => {
    const timer = setTimeout(async () => await ordersLoading(), 1000);
    return () => {
      clearTimeout(timer);
    };   
},[update]) //orders



const [alignment, setAlignment] = React.useState('left');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {

    setAlignment(newAlignment);

  };


const [newOrder,setOrder] = useState<IDialogAddOrder>();

const addOrder= (value : IDialogAddOrder) =>
{
    //console.log("NEW = ", value)
    if(value.name == undefined || value.products.length === 0)
    {
        //console.log("НЕТ ")
        return ;
    }
    orderAdd(value);
}


const even = (n: number) => !(n % 2);

//Array.from(Array(10))


const startSimulation = async (name: string, sim: boolean) => {
    SetUpdate(true);
    let copyObjet = {
      name: name,
      simulation: sim
    }
            const response = await axios.post('http://'+serverApiHost+':'+port+'/api/cardVSM/addorderinwork',JSON.stringify(copyObjet),
            {
                headers: {
                   "Access-Control-Allow-Origin": "*",
                  'Content-Type': 'application/json'
                }
            })

            if(response.status === 200)
            {
                console.log("Add Ok");
            }

     SetUpdate(false);
  }




if(loading)
{
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
    )
}

const listData =  orders?.map((item: Order_view, index)=>{

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

        case OrderRole.ArchiveBad:
            OrderColor = IDataColorOrderInDefault.DoneBad
            break;
        case OrderRole.ArchiveGood:
            OrderColor = IDataColorOrderInDefault.DoneGood
            break;
        default:
            break;
    }

   return (
       <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
           <CardOrderInNewAlgoritmDefault OrderColor={OrderColor} data={item}/>
       </Grid>
   )
})


    return (
            <div>
                <Box > {/*sx={{margin:'0px 10px 0px 10px'}}*/}
                    <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center', padding: '0px 10px 0px 10px'}}>
                        <div>
                        <h3>Заказы для расчета времени</h3>
                        <DialogAddOrderNewAlgoritm addOrder={addOrder}/>
                        </div>
                        <div>
                            <ToggleButtonMy alignment= {alignment} handleChange={handleChange}/>
                        </div>
                    </div>
                    <Box sx={{display: 'flex', padding: '0px 10px 0px 10px'}}>


                    { alignment === 'left' ? 
                            <TableView orders={orders} view={"prepair"} startSimulation={startSimulation}/>
                        :
                        
                        <Grid container spacing={2}>
                            {listData}
                        </Grid>
                        }
                    </Box>
                </Box>
            </div>
    ) 
}

export default PageNewAlgoritmAddOrder;

//xs={12} sm={6} md={4} lg={4} xl={3}
//xs={12} md={3}
/*
  <DialogAddOrder addOrder={addOrder}/>
            <Box sx={{display: 'flex'}}>
                <Grid container spacing={2}>
                    {listData}
                </Grid>
            </Box>
            */