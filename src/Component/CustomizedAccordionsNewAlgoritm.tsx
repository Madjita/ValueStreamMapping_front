import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@material-ui/core/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

//
import CustomizedAccordiongsHeaderNewAlgoritm from './CustomizedAccordiongsHeaderNewAlgoritm';
import View from './Card/View'
//
import IDialogAddOrder from './Data/Dialog/IDialogAddOrder'
import IDialogAddOrderItem from './Data/Dialog/IDialogAddOrderItem'

//
import { useActionOrders } from '../hooks/useActionOrders';
import { useTypedSelector } from '../hooks/leftMenuSelector';
import IDataOrder from './Data/IDataOrder';

import * as signalR from "@microsoft/signalr";
import useWebSocket, { ReadyState } from 'react-use-websocket';

import {OrderMy} from '../type/useOrdersType'

import ip,{URL_orderList} from '../global'
import serverApiHost,{port} from "../global";

import axios from 'axios';
import Order_view from './Data/IDataOrder/IDataOrder';
import ViewNewAlgorithm from './Card/ViewNewAlgorithm';
let URL = 'ws://+ip+:5001/orderlist';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    margin: 0
  },
}));



let count = 2;



////////

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordionsNewAlgoritm(props:{newOrder: IDialogAddOrder}) {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };


    const {orders2, loading} = useTypedSelector(state => state.orders);
    const {ordersLoading2} = useActionOrders()


   


 
    const socket = React.useRef(null)  as any;
    //const [myOrders, setMyOrders] = React.useState([] as IDataOrder[]);
    const [myOrders, setMyOrders] = React.useState([] as OrderMy[]);
    const [reconnect, setRecconect] = React.useState(false);


    const [orders, SetOrders] = React.useState<Order_view[]>();

    const updateOrderWork = async () =>{
      const response = await axios.post('http://'+serverApiHost+':'+port+'/api/cardVSM/getAllOrderInWork',{
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Access-Control-Allow-Origin": "*",
            'Content-Type': 'application/json'
          }
        })

        if(response.status != 200)
        {
          return ;
        }

        console.log("updateOrderWork = ", response.data)

        let content = response.data as any;

        let object = content.orders as Order_view[];
        
        SetOrders(object)
  }
  
  
  React.useEffect(() => {
      const timer = setTimeout(async () => await updateOrderWork(), 1000);
      return () => {
        clearTimeout(timer);
      };   
  },[orders])
 

  let listData = orders?.map((item: Order_view, index: number)=>{
      let idName = "panel"+index+"a-header"
      let ariaControls = "panel"+index+"a-content"


      return (  
              <Accordion key={index} TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                  expandIcon={<ArrowForwardIosSharpIcon/>}
                  aria-controls={ariaControls}
                  id={idName}
                >
                  <Typography component={'span'} sx={{width: '100%',marginLeft:'10px'}}>
                    <CustomizedAccordiongsHeaderNewAlgoritm data={item}/>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails  sx={{height: 'calc(100vh - 200px)'}}>
                  <ViewNewAlgorithm key={index} item={item}/>
                </AccordionDetails>
              </Accordion>
      )
    })


    return (
      <div style={{paddingLeft: '50px', paddingRight: '50px'}}>
      {
       reconnect ?  
      <button onClick={() => setRecconect(!reconnect)}>
			 Переподключение
			</button> 
      :
      null
      }

        {listData?.length === 0  ? 
        
        <p>В работе нет заказов</p>
        
        :listData }
      </div>
    );
}
