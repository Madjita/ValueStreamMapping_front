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

const CardOrderInNewAlgoritmArchive = (props:{OrderColor: IDataColorOrderInDefault, data: Order_view}) => {


  const [simulation, setSimulation] = useState({
    color: IDataColorOrderInDefault.DoneGood,
    work: false
  });

  const[order, setOrder] = useState<Order_view>(props.data);


  if(props.data.name != order.name)
  {
    setOrder(props.data);
    setSimulation({
      color: IDataColorOrderInDefault.DoneGood,
      work: false
    });
  }


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
    <Card sx={{ minWidth: 100,color:'white',  backgroundColor: simulation.color }}>
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
      />
      <Divider/>
      <Typography style={{color: 'white', padding: '0px', margin: '0px'}}>
                     <div style={{display: 'flex', justifyContent:'space-around'}} >
                      <p>Срок до: {moment(order?.limitation).format('MM/DD/YYYY H:m:s')}</p>
                    </div>
      </Typography>
      <Divider/>
      <CardActions style={{justifyContent: 'center'}}>
        <Typography style={{color:'white'}}> 
                   <div style={{display: 'flex', justifyContent:'space-around'}} >
                    <p>Затраченное время: {timeTActual}</p>
                  </div>
        </Typography>
      </CardActions>
    </Card>
  );
}

export default CardOrderInNewAlgoritmArchive;