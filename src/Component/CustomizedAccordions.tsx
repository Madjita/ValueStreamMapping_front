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
import CustomizedAccordiongsHeader from './CustomizedAccordiongsHeader';
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


/////////





let product1_vsm = [
  {
     sections: [
       {
         etapNumeric: 1,
         bufferVSM: {
           name: "Буфер 1",
           max: 100,
           value: 75,
           minHold: 50
           
         },
         etapVSM: {
           name: "Етап 2"
         }
       },
   ]
  },
   //item 2 section             
  {
     sections: [
       {
         etapNumeric: 2,
         bufferVSM: {
           name: "Буфер 2",
           max: 100,
           value: 30
         },
         etapVSM: {
           name: "Етап 2"
         }
       },
       {
         etapNumeric: 2,
         bufferVSM: {
           name: "Буфер 3",
           max: 100,
           value: 30
         },
         etapVSM: {
           name: "Етап 3"
         }
       },
       {
         etapNumeric: 2,
         bufferVSM: {
           name: "Буфер 3",
           max: 100,
           value: 30
         },
         etapVSM: {
           name: "Етап 3"
         }
       },
       {
         etapNumeric: 2,
         bufferVSM: {
           name: "Буфер 3",
           max: 100,
           value: 30
         },
         etapVSM: {
           name: "Етап 3"
         }
       },
       
     ]
  },
  /// item 3
  {
    sections:[
     {
       etapNumeric: 3,
       bufferVSM: {
         name: "Буфер 4",
         max: 100,
         value: 30
       },
       etapVSM: {
         name: "Етап 4"
       }
     },
     {
       etapNumeric: 3,
       bufferVSM: {
         name: "Буфер 4",
         max: 100,
         value: 30
       },
       etapVSM: {
         name: "Етап 4"
       }
     },
     {
       etapNumeric: 3,
       bufferVSM: {
         name: "Буфер 4",
         max: 100,
         value: 30
       },
       etapVSM: {
         name: "Етап 4"
       }
     },
    ]
  },
  // item 4
  {
   sections: [
     {
       etapNumeric: 1,
       bufferVSM: {
         name: "Буфер 1",
         max: 100,
         value: 50
         
       },
       etapVSM: {
         name: "Етап 2"
       }
     },
 ]
},
]

let product2_vsm = [
{
  sections: [
    {
      etapNumeric: 1,
      bufferVSM: {
      name: "Буфер 1"
  },
  etapVSM: {
    name: "Етап 1"
  }
    }
]
}
]


let shemaOrder_1 = [
  {
    name: 'Продукт 1', TActual: 600, TPlan: 800,
  sections: product1_vsm
  },
  //
  {
    name: 'Продукт 2', TActual: 600, TPlan: 800,
  sections: product2_vsm
  }
  //
]


let shemaOrder_2 = [
  {
    name: 'Продукт 1', TActual: 600, TPlan: 800,
  sections: product1_vsm
  },
  //
  {
    name: 'Продукт 2', TActual: 600, TPlan: 800,
  sections: product2_vsm
  }
  //
]


let list =[
  {name: 'Заказ 1', TActual: 920, TPlan: 800,
    products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },


  //

  {name: 'Заказ 1', TActual: 920, TPlan: 800,
    products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 1', TActual: 920, TPlan: 800,
    products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 1', TActual: 920, TPlan: 800,
    products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  {name: 'Заказ 2', TActual: 500, TPlan: 800,
  products: shemaOrder_1
  },
  
]

let count = 2;



////////

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions(props:{newOrder: IDialogAddOrder}) {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };


    /*
    //
    // Builds the SignalR connection, mapping it to /chat
    const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://192.168.0.2:5001/chat",{
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
  })
    //.configureLogging(signalR.LogLevel.Information)  
    .build();


    // Starts the SignalR connection
    hubConnection.start().then(a => {
      // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
      if (hubConnection.connectionId) {
        hubConnection.invoke("sendConnectionId", hubConnection.connectionId);
      }   
    }).catch(err => console.log('Error while starting connection: ' + err));


    const SignalRTime: React.FC = () => {      
      // Sets the time from the server
      const [time, setTime] = React.useState<string | null>(null);
 
      React.useEffect(() => {
        hubConnection.on("setTime", message => {
          setTime(message);
        });     
      });
 
      return <p>The time is {time}</p>;
    };
    */
    ///


    const {orders2, loading} = useTypedSelector(state => state.orders);
    const {ordersLoading2} = useActionOrders()


   


 
    const socket = React.useRef(null)  as any;
    //const [myOrders, setMyOrders] = React.useState([] as IDataOrder[]);
    const [myOrders, setMyOrders] = React.useState([] as OrderMy[]);
    const [reconnect, setRecconect] = React.useState(false);
  
   /* React.useEffect(() => {
      const timer = setInterval(()=>{ordersLoading2()},1000)
      return () => {
        clearInterval(timer);
      }
    }, [orders2]) */


    /*
    React.useEffect(() => {
		console.log("Set socket after = ", socket.current);
		if (!socket.current || reconnect === false) {
			console.log("Set socket = ", socket.current);
			socket.current = new WebSocket(URL_orderList) ; //URL
			socket.current.onmessage = (e: any) => {
				
				const OrdersFromServer = JSON.parse(e.data) as IDataOrder[];  
				console.log("e", OrdersFromServer);
        console.log("e myOrders", myOrders);
				setMyOrders([...OrdersFromServer] as IDataOrder[]);
			};

			socket.current.onopen = () => {
				// on connecting, do nothing but log it to the console
				console.log('connected')
				//socket.current.send(JSON.stringify({ id: '1'}));
			}

			

			socket.current.onerror = (e : any) => {
				console.log("eror", e.data);
        console.log("CONNECTION CLOSED", e.data);
				socket.current.close(1000, "");

        setRecconect(true);
			};

			socket.current.onclose = (e : any)=>{
				console.log("CONNECTION CLOSED", e.data);
				socket.current.close(1000, "");

				setRecconect(true);
			}
		}
		return () => {
		  if (socket.current) {
			socket.current.close(1000, "");
		  }
		};
	  }, [socket,reconnect]);

    console.log("rerender")
    */


    React.useEffect(() => {
      console.log("Set socket after = ", socket.current);
      if (!socket.current || reconnect === false) {
        console.log("Set socket = ", socket.current);
        socket.current = new WebSocket(URL_orderList) ; //URL
        socket.current.onmessage = (e: any) => {

          const OrdersFromServer = JSON.parse(e.data) as OrderMy[];  
          //console.log("e", OrdersFromServer);
          setMyOrders(OrdersFromServer as OrderMy[]);
        };
  
        socket.current.onopen = () => {
          // on connecting, do nothing but log it to the console
          console.log('connected')
          //socket.current.send(JSON.stringify({ id: '1'}));
        }
  
        
  
        socket.current.onerror = (e : any) => {
          console.log("eror", e.data);
          console.log("CONNECTION CLOSED", e.data);
          socket.current.close(1000, "");
  
          setRecconect(true);
        };
  
        socket.current.onclose = (e : any)=>{
          console.log("CONNECTION CLOSED", e.data);
          socket.current.close(1000, "");
  
          setRecconect(true);
        }
      }
      return () => {
        if (socket.current) {
        socket.current.close(1000, "");
        }
      };
      }, [socket,reconnect]);
  
      console.log("rerender")


     


/*
    React.useEffect(() => {
    const timer = setTimeout(() => ordersLoading(), 1000); 
    return () => {
      
      //console.log("timer ", orders);
    };  
    },[orders])//orders*/

   // console.log("CustomizedAccordions rerender")

    /*if(props.newOrder != null)
    {
      count++;


      let listOrderProduct = props.newOrder.products.map((item: IDialogAddOrderItem)=>{

          let sectionVSM;

          if(item.name === 'Продукт 1')
          {
            sectionVSM = product1_vsm;
          }
          if(item.name === 'Продукт 2')
          {
            sectionVSM = product2_vsm;
          }

          let newObj = {
            name: item.name,
            quantity: item.quantity,
            TActual: 600, 
            TPlan: 800,
            sections: sectionVSM
          }
          return newObj;
        

      })

      let shemaOrder_1 = [
        ...listOrderProduct
      ]



      let obj = {name: 'Заказ '+count, TActual: 500, TPlan: 800,
      products: shemaOrder_1
      }

      list.push(obj as any)
    }
    */




    let listData = myOrders.map((item: OrderMy, index: number)=>{
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
                    <CustomizedAccordiongsHeader data={item.order}/>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails  sx={{height: 'calc(100vh - 200px)'}}>
                  <View key={item.order.id} item={item}/>
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

        {listData.length === 0  ? 
        
        <p>В работе нет заказов</p>
        
        :listData }
      </div>
    );
}


/*

{name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},
      {name: 'Заказ 1', TActual: 600, TPlan: 800},
      {name: 'Заказ 2', TActual: 600, TPlan: 800},
      {name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},
      {name: 'Заказ 1', TActual: 600, TPlan: 800},
      {name: 'Заказ 2', TActual: 600, TPlan: 800},
      {name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},
      {name: 'Заказ 1', TActual: 600, TPlan: 800},
      {name: 'Заказ 2', TActual: 600, TPlan: 800},
      {name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},
      {name: 'Заказ 1', TActual: 600, TPlan: 800},
      {name: 'Заказ 2', TActual: 600, TPlan: 800},
      {name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},
      {name: 'Заказ 1', TActual: 600, TPlan: 800},
      {name: 'Заказ 2', TActual: 600, TPlan: 800},
      {name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},
      {name: 'Заказ 1', TActual: 600, TPlan: 800},
      {name: 'Заказ 2', TActual: 600, TPlan: 800},
      {name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},
      {name: 'Заказ 1', TActual: 600, TPlan: 800},
      {name: 'Заказ 2', TActual: 600, TPlan: 800},
      {name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},
      {name: 'Заказ 1', TActual: 600, TPlan: 800},
      {name: 'Заказ 2', TActual: 600, TPlan: 800},
      {name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},
      {name: 'Заказ 1', TActual: 600, TPlan: 800},
      {name: 'Заказ 2', TActual: 600, TPlan: 800},
      {name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},
      {name: 'Заказ 1', TActual: 600, TPlan: 800},
      {name: 'Заказ 2', TActual: 600, TPlan: 800},
      {name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},
      {name: 'Заказ 1', TActual: 600, TPlan: 800},
      {name: 'Заказ 2', TActual: 600, TPlan: 800},
      {name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},
      {name: 'Заказ 1', TActual: 600, TPlan: 800},
      {name: 'Заказ 2', TActual: 600, TPlan: 800},
      {name: 'Заказ 3', TActual: 600, TPlan: 800},
      {name: 'Заказ 4', TActual: 600, TPlan: 800},

*/