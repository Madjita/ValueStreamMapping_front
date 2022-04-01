import React,{useEffect, useState,useRef} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { Divider } from '@mui/material';

import {IDataColorOrderInDefault} from '../../Data/DataCardOrderInDefault/IDataColorOrderInDefault'
import IDataOrder from '../../Data/IDataOrder';
import { Redirect,useHistory, useLocation } from 'react-router'
import { useActionOrders } from '../../../hooks/useActionOrders';
import { useTypedSelector } from '../../../hooks/leftMenuSelector';

import axios from 'axios'
import ip, {port} from '../../../global'

import moment from 'moment';
import Order_view from '../../Data/IDataOrder/IDataOrder';
import OrderRole from '../../Data/OrderRole';

enum simulationEnum{
  Start = 'Запустить симуляцию',
  Stop = 'Остановить симуляцию'
}
const CardOrderInNewAlgoritmDefault = (props:{OrderColor: IDataColorOrderInDefault, data: Order_view}) => {

  const {Start,Stop} = simulationEnum;


  
  const [simulation, setSimulation] = useState({
    text: simulationEnum.Start,
    color: IDataColorOrderInDefault.NotWork,
    work: false
  });


  //const [simulation, setSimulation] = useState(false)

  const[order, setOrder] = useState<Order_view>(props.data);


  if(props.data.name != order.name)
  {
    setOrder(props.data);
    setSimulation({
      text: simulationEnum.Start,
      color: IDataColorOrderInDefault.NotWork,
      work: false
    });
  }

  //const {startSimulation, updateInfoOrder} = useActionOrders()


  const startSimulation = async (name: string, sim: boolean) => {

    let copyObjet = {
      name: name,
      simulation: sim
    }
            const response = await axios.post('http://'+ip+':'+port+'/api/cardVSM/addorderinwork',JSON.stringify(copyObjet),
            {
                headers: {
                   "Access-Control-Allow-Origin": "*",
                  'Content-Type': 'application/json'
                }
            })

            if(response.status === 200)
            {
                console.log("Add Ok")
            }
  }

  const onSimulation = () => {

    if(simulation.work)
    {
      let sim = !simulation.work;
      setSimulation({...simulation, work:sim, text: Stop , color: IDataColorOrderInDefault.Stoped  })
      startSimulation(order.name, sim);
    }
    else
    {
      let sim = !simulation.work;
      setSimulation({...simulation, work:sim, text: Start, color: IDataColorOrderInDefault.InWork })
      startSimulation(order.name, sim);
    }
   // let newObj = {...order, simulation: !simulation};

    //setSimulation(newObj.simulation);
    //setOrder(newObj);
    //startSimulation(newObj);
  }

  //let flag = (simulation.text === simulationEnum.Stop && simulation.work)

  const timer = useRef(null);
  const GetInformation = async() => {

    let copyObjet = {
      name: order.name,
      simulation: order.simulation
    }

    const response = await axios.post('http://'+ip+':'+port+'/api/cardVSM/updateInfoOrder',JSON.stringify(copyObjet),
    {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
        }
    })

    if(response.status === 200)
    {
       let responseData =  JSON.parse(JSON.stringify(response.data)) as Order_view;

       if(responseData.simulation === false && (responseData.orderRole === OrderRole.ArchiveGood || responseData.orderRole === OrderRole.ArchiveBad ) )
       {
        setSimulation({...simulation, work: false, text: Stop, color: IDataColorOrderInDefault.DoneGood  })
       }
       setOrder(responseData);
    }
  }

  
   
  useEffect(() => {
    const timer = setTimeout(() => GetInformation(), 500); 
    return () => {
      clearTimeout(timer);
    };
  },[order]);
 
  const history = useHistory();

  const openInfo = () => {
    history.push('/orderInfo', { data: props.data});
  }


    // Helper
const StringIsNumber = (value: any,index: any) => {if(index === order?.orderRole-1) return true};

// Turn enum into array
function ToArray(enumme: any) {
    return Object.keys(enumme)
        .filter(StringIsNumber)
        .map(key => enumme[key])
        .at(0);
}

let listRole = ToArray(IDataColorOrderInDefault);






let timeTActual = moment.unix(order?.tActual).utc().format('H:m:s')

  return (
    <Card sx={{ minWidth: 200,color: simulation.work ? 'white':'black',  backgroundColor: simulation.color }}>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        action={
         <div>
          <IconButton 
          aria-label="settings"
          onClick={openInfo}>
            <SettingsIcon style={{color: ''}}/>
          </IconButton>
         </div>
        }
        title={"Заказ номер: "+order?.name}
        subheader={
        <Typography style={{color: simulation.work ? 'white':'black'}}>
          
          Актуальное время выполнения: { order.orderRole === OrderRole.ArchiveGood || order.orderRole === OrderRole.ArchiveBad  || order.orderRole === OrderRole.Work ? timeTActual : ''}   
                   <Divider/>
                   <div style={{display: 'flex', justifyContent:'space-around'}} >
                    <p>Актуальное время: {moment(Date.now()).format('MM/DD/YYYY H:m:s')}</p>
                    <p>Срок до: {moment(order?.limitation).format('MM/DD/YYYY H:m:s')}</p>
                  </div>
                  <div style={{display: 'flex', justifyContent:'space-around'}} >
                    <p>План: {moment.unix(order?.tPlan).utc().format('H:m:s') + " ("+order?.tPlan+" сек)"} </p>
                    <p>Прогноз: {moment.unix(order?.tFuture).utc().format('H:m:s') + " ("+order?.tFuture+" сек)"}</p>
                  </div>
                  
        </Typography>
      }
      />
      <Divider/>
      <CardActions>
        <Button style={{borderColor: simulation.work ? '':'white',backgroundColor: simulation.work ? '#12824C':'', color: '#FFFFFF'}} size="small" variant={simulation.work ? "contained":"outlined"} onClick={onSimulation}>
          {simulation.work ? "Остановить симуляцию":"Запустить симуляцию"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardOrderInNewAlgoritmDefault;