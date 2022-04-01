import moment from 'moment';
import React,{useState} from 'react'
import IDataOrder from './Data/IDataOrder';

import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ArchiveIcon from '@material-ui/icons/Archive';
import StopIcon from '@material-ui/icons/Stop';
import WorkIcon from '@material-ui/icons/Work';

import { IconButton } from '@material-ui/core';

import { useActionOrders } from '../hooks/useActionOrders';
import { useTypedSelector } from '../hooks/leftMenuSelector';
import usePrevious from '../hooks/usePrevious';


import ip from '../global'
let URL = 'ws://'+ip+':5001/wsItem';

interface IDataHeader{
    name?: string,
    TActual: number,
    TPlan: number
}



const CustomizedAccordiongsHeader = (props:{data: IDataOrder})  => 
{
    const [order, setOrder] = useState<IDataOrder>(props.data); //props.data

    const [bad,setBad] = useState(false);
    const [textPeriod,setTextPeriod] = useState("");


    React.useEffect(() => {
        setOrder(props.data);
    }, [props.data]);


  

    //const {orders, loading} = useTypedSelector(state => state.orders);
    //const {updateInfoOrder} = useActionOrders()

    //const prevOrder = usePrevious(order) as IDataOrder | undefined;

  /* React.useEffect(() => {
        const timer = setTimeout(() => updateInfoOrder(order as IDataOrder), 1000); 
        return () => {
          clearTimeout(timer);
        };  
    })*/
    

  /* React.useEffect(() => {
        if(prevOrder != undefined)
        {
            if(prevOrder.tActual  != order.tActual)
            {
                setOrder(props.data)
            }
        }
    },[props.data])*/

   /* console.log(prevOrder, props.data)
    if(prevOrder != undefined)
    {
           
     }*/

///

/*
    const socket = React.useRef(null)  as any;
    const [reconnect, setRecconect] = React.useState(false);
  
      React.useEffect(() => {
		console.log("Set socket after order= ", socket.current);
		if (!socket.current || reconnect === false) {
			console.log("Set socket = ", socket.current);
			socket.current = new WebSocket(URL) ;
			socket.current.onmessage = (e: any) => {
				
               
				const OrdersFromServer = JSON.parse(e.data) as IDataOrder;  
				//console.log("e", OrdersFromServer);
                //console.log("e order", order);
				setOrder(OrdersFromServer);
			};

			socket.current.onopen = () => {
				// on connecting, do nothing but log it to the console
				console.log('connected')
				socket.current.send(JSON.stringify({ id: props.data.id}));
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


      if(order === null || order === undefined)
      {
          return (
             <p>Не нашел</p>
          )
      }
      */

      //console.log("rerender Order = ", order?.id)


    /* if(order?.tActual  != props.data.tActual)
     {
         setOrder(props.data)
     }*/

   
   
    const {
        name,
        tActual,
        tPlan,
        tFuture,
        tStop,
        tStart} = order as IDataOrder;
  

    

    let timeTActual = moment.unix(tActual).utc().format('HH:mm:ss')
    let timeTPlan = moment.unix(tPlan).utc().format('HH:mm:ss')
    


    const ConvertPeriodToString = (timePeriod: any)=>
    {
        var list = timePeriod.split(' ')

        let text = timePeriod;
        //console.log(list);

        if(list[0] === 'in')
        {


            if(list[1] === 'a')
            {
                text = "Отставание на несколько сукунд"
                if(list[2] === 'minute')
                {
                    text = "Отставание на 1 м"
                }
                
            }
            else
            {
                let t =list[1];
                text = "Отставание на "+ t

                switch(list[2])
                {
                    case "hours": 
                        text += " ч"
                    break;
                    case "minutes": 
                        text += " м"
                    break;
                    
                }
            }
           // console.log(text)
        }
        else
        {
            if(list[0] === 'a')
            {
                text = "В запасе много времени"
                if(list[2] === 'minute')
                {
                    text = "Отставание на 1 м"
                }
                
            }
            else
            {
                text = "В запасе " + list[0];
                switch(list[1])
                {
                    case "hours": 
                        text += " ч"
                    break;
                    case "minutes": 
                        text += " м"
                    break;
                    
                }
            }
           
        }

        if(textPeriod != text)
        {
            setTextPeriod(text);
        }
       
    }

  //var diff = moment("23:07").unix() - moment("22:07").unix();
  
  let timePeriod = '';
  let timeFuture = moment.unix(tFuture).utc().format('HH:mm:ss');
  let text = '';


  let dateStop: Date = new Date(tStop);  
  let dateStart: Date = new Date(tStart);  

  //console.log("tStop =",dateStop);
  //console.log("tStart =",dateStart);

  let tt = dateStop.getTime() - dateStart.getTime();

 /* if(tt < 0)
  {
      tt = dateStart.getTime() - dateStop.getTime();
  }*/
  
  let dd: Date = new Date(tt);

  let timeArchive =  moment(dd).utc().format('HH:mm:ss');//moment.unix( (dateStop.getTime()  - dateStart.getTime()) ).utc().format('H:m:s');
  if(tPlan - tActual  === 0)
  {
    timePeriod  = moment.unix(tPlan-tActual).utc().format('HH:mm:ss');
    text = '';
  }
  else
  {
    if(tPlan - tActual > 0)
    {
           timePeriod   = moment.unix(tPlan-tActual).utc().format('HH:mm:ss');
           text = 'Осталось';
    }
    else
    {
          timePeriod   = moment.unix(tActual-tPlan).utc().format('HH:mm:ss');
          text = 'Отставание на';
    }
  }
 
  

// let timePeriod =  moment.unix(tPlan).from(moment.unix(tActual))   //ConvertPeriodToString( moment.unix(tActual).utc().from(moment.unix(tPlan).utc()) )

  
    if(tActual >= tPlan && bad === false ) //&& order.orderRole === 2 || order.orderRole === 3
    {
        setBad(true);
    }

    if(tActual < tPlan && bad)
    {
        console.log(tActual,tPlan);
        setBad(false);
    }


    let orderRole;

    switch(order.orderRole)
    {
        case 1:
            orderRole = <PlayArrowIcon style={{color: 'gray'}}/>
        break;
        case 2:
            orderRole =  <WorkIcon style={{color: 'orange'}}/>
        break;
        case 3:
            orderRole =  <ArchiveIcon style={{color: 'green'}}/>
        break;
        case 4:
            orderRole =  <StopIcon style={{color: 'red'}}/>
        break;
    }

    
    if(order.orderRole === 3)
    {
     

        let seee = dd.getSeconds() >= tPlan
        
        return (
            <div style={{display: 'grid', gridTemplateColumns: '100px auto',}}>
                <p>{name}</p>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
                    <div style={{display: 'flex', justifyContent:'space-around'}} >
                        <p>Затраченоое время</p>
                        <p style ={{backgroundColor: seee ? 'red': '', color: seee ? "white": "" }}>{timeArchive}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent:'space-around'}} >
                        <p>Плановое время</p>
                        <p style ={{backgroundColor: seee ? 'red': '', color: seee ? "white": "" }}>{timeTPlan}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent:'space-around'}} >
                        <p>{orderRole}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{display: 'grid', gridTemplateColumns: '100px auto',}}>
                <p>{name}</p>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
                    <div style={{display: 'flex', justifyContent:'space-around'}} >
                        <p>Актуальное вермя</p>
                        <p style ={{backgroundColor: bad ? 'red': '', color: bad ? "white": "" }}>{timeTActual}</p>
                        <p>{text}</p>
                        <p>{timePeriod}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent:'space-around'}} >
                        <p>Плановое время</p>
                        <p style ={{backgroundColor: bad ? 'red': '', color: bad ? "white": "" }}>{timeTPlan}</p>
                    </div>
                    <div style={{display: 'flex', justifyContent:'space-around'}} >
                        <p>Прогнозируемое время</p>
                        <p>{timeFuture}</p>
                        <p>{orderRole}</p>
                    </div>
                </div>
        </div>
    )
}


export default CustomizedAccordiongsHeader;