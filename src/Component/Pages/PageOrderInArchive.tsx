import  React, { useEffect,useState } from 'react'
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
import CardOrderInNewAlgoritmArchive from '../Card/Pages/CardOrderInNewAlgoritmArchive';

import TableView from '../PageExample/DemoArchive'
import ToggleButtonMy from '../PageExample/ToggleButtonMy'

///////////////////////////////////

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



const PageOrderInArchive = () =>
{

const [orders, SetOrders] = useState<Order_view[]>();
const [loading, SetLoading] = useState(true);


const [alignment, setAlignment] = React.useState('left');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {

    console.log("AAAAA");
    setAlignment(newAlignment);

  };


const ordersLoading = async () => {
    const response = await axios.get('http://'+serverApiHost+':'+port+'/api/cardVSM/getallOrdersInArchive')
    if(response.status != 200)
    {
      return ;
    }
    let content = response.data as any;
    let ordersFromServer =  content.orders as Order_view[];
    SetOrders(ordersFromServer);
    SetLoading(false);
}

const orderAdd = async (newOrder : IDialogAddOrder) =>{
    const response = await axios.post('http://'+serverApiHost+':'+port+'/api/cardVSM/addorderprepair',JSON.stringify(newOrder),{
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
        }
      })
}


useEffect(() => {
    const timer = setTimeout(async () => await ordersLoading(), 1000);
    return () => {
      clearTimeout(timer);
    };   
},[orders])



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
           <CardOrderInNewAlgoritmArchive OrderColor={OrderColor} data={item}/>
       </Grid>
   )
})




    return (
            <div>
                <Box > {/*sx={{margin:'0px 10px 0px 10px'}}*/}
                    <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center', padding: '0px 10px 0px 10px'}}>
                        <h3>Заказы в архиве</h3>
                        <ToggleButtonMy alignment= {alignment} handleChange={handleChange}/>
                    </div>
                    
                    <Box sx={{display: 'flex', padding: '0px 10px 0px 10px'}}>
                        { alignment === 'left' ? 
                            <TableView orders={orders} view={"archive"}/>
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

export default PageOrderInArchive;