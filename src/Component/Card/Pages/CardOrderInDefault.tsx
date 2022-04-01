import React,{useEffect, useState,useRef} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
import ip,{port} from '../../../global'

import moment from 'moment';

enum simulationEnum{
  Start = 'Запустить симуляцию',
  Stop = 'Остановить симуляцию'
}
const CardOrderInDefault = (props:{OrderColor: IDataColorOrderInDefault, data: IDataOrder}) => {

  const {Start,Stop} = simulationEnum;


  /*
  const [simulation, setSimulation] = useState({
    text: simulationEnum.Start,
    color: IDataColorOrderInDefault.NotWork,
    work: false
  });
  */

  const [simulation, setSimulation] = useState(false)

  const[order, setOrder] = useState<IDataOrder>(props.data);


  

  const {startSimulation, updateInfoOrder} = useActionOrders()

  const onSimulation = () => {

    /*if(simulation.work)
    {
      let sim = !simulation.work;
      setSimulation({...simulation, work:sim, text: Start })
      startSimulation(props.data as IDataOrder, sim);
    }
    else
    {
      let sim = !simulation.work;
      setSimulation({...simulation, work:sim, text: Stop })
      startSimulation(props.data as IDataOrder, sim);
    }*/
    let newObj = {...order, simulation: !simulation};

    setSimulation(newObj.simulation);
    setOrder(newObj);
    startSimulation(newObj);
  }

  //let flag = (simulation.text === simulationEnum.Stop && simulation.work)

  const timer = useRef(null);
  const GetInformation = async() =>{
    const response = await axios.post('http://'+ip+':'+port+'/api/manufacture/updateInfoOrder',JSON.stringify(order),
    {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
        }
    })

    if(response.status === 200)
    {
       let responseData =  JSON.parse(JSON.stringify(response.data)) as IDataOrder;
       setOrder(responseData);
       setSimulation(responseData.simulation);
    }
  }

   
  useEffect(() => {
    const timer = setTimeout(() => GetInformation(), 800); 
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
    <Card sx={{ minWidth: 200,color: simulation ? 'white':'black',  backgroundColor: listRole }}>
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
        subheader={<Typography style={{color: simulation ? 'white':'black'}}>{ simulation ? timeTActual : ''}</Typography>}
      />
      <Divider/>
      <CardActions>
        <Button style={{borderColor: simulation? '':'white',backgroundColor: simulation? '#12824C':'', color: '#FFFFFF'}} size="small" variant={simulation ? "contained":"outlined"} onClick={onSimulation}>
          {simulation ? "Остановить симуляцию":"Запустить симуляцию"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardOrderInDefault;