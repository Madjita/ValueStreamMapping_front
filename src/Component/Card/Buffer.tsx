import React,{useEffect, useState} from 'react'
import { styled } from '@material-ui/core/styles';

import Triangle from './Triangle'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IDataBufferVSM from '../Data/IDataBufferVSM';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {IconButtonProps} from '@material-ui/core/IconButton'

import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IDataOrderItem from '../Data/IDataOrderItem'
import SettingsIcon from '@material-ui/icons/Settings';
import axios from 'axios'

import ip from '../../global'
import IDatabufferVSMQueue from '../Data/IDatabufferVSMQueue';
import IDataOrder from '../Data/IDataOrder';
import OrderRole from '../Data/OrderRole';
import moment from 'moment'
import IDataOrderPart from '../Data/IDataOrderPart';
import { Buffer_view, OrderProductionItem, OrderProduction_view } from '../Data/IDataOrder/IDataOrder';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

  

const Buffer = (props:{buffer: Buffer_view, orderProduct: OrderProduction_view}) => {

    const Colors = { RED: 'red', GREEN: 'green', YELLOW: 'yellow', WHITE: 'white', Header: '#6495ed'};

     const {
      name,
      max,
      minHold,
      valueDefault,
      type,
      value
    } = props.buffer;

    const ExpandMore = styled((props: ExpandMoreProps) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        //transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [information, setInformation] = useState({
      buffer: props.buffer as Buffer_view,
      show: false
    });

    const [color,setColor] = useState('#d3d3d3');



let timeCircl = React.useRef();
let orderItems = [] as any;


if(props.buffer.orderProductionItems != undefined)
{

    orderItems =  props.buffer.orderProductionItems.filter(o=> o._nameOrder === props.orderProduct.orderProductionItems[0]._nameOrder).map((item: OrderProductionItem, index: number) =>{
    var time = moment.unix(item._tActual).utc().format('H:m:s')


    if(props.buffer.orderProductionItems.length > 0 )
    {
      //timeCircl.current = props.buffer.orderProductionItems[props.buffer.orderProductionItems.length-1].currentOrderItems.tActual as any
      //timeCircl.current  = parseInt(item._tActual,10)
    }

    return(
      <div key={index} style={{backgroundColor: color}}>
            <p style={{display: 'flex', justifyContent:'center', fontWeight: 'bold'}} >{props.orderProduct.orderProductionItems[0]._nameOrder}</p>
            <div style={{display: 'flex', justifyContent:'space-around'}} >
              <p>№ Текущего заказа</p>
              <p>Всего заказов</p>
            </div>
            <div style={{display: 'flex', justifyContent:'space-around'}} >
              <p >{item._part}</p>
              <p >{props.orderProduct.orderProductionItems.length}</p>
            </div>
            <p style={{display: 'flex', justifyContent:'center'}} >Общее время</p>
            <p style={{display: 'flex', justifyContent:'center', fontWeight: 'bold'}}>{time} сек</p>
      </div>
    )
  })
}

 

    return(
        <Card sx={{ minWidth: '150px', maxWidth: '250px',verticalAlign: 'middle', textAlign: 'center', wordWrap: 'break-word'}}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                    <SettingsIcon />
                    </IconButton>
                }
                title={name}
                sx={{fontWeight: 'bold', color:'white', backgroundColor: Colors.Header ,paddingBottom: '0px'}}>
            </CardHeader>
            <div  style={{fontWeight: 'bold',fontSize:'1rem',backgroundColor: Colors.Header,color: 'white', display: 'flex', justifyContent: 'space-around'}}>
              <p>Время цикла:</p>
              <p>{timeCircl.current}</p>
            </div>
            <CardContent style={{padding: 1}}>
                    <p style={{display: 'flex', justifyContent:'center', margin: 0}}> {max}</p>
                    <Triangle buff={{name: name, minHold: minHold, max: max,value: value,valueDefault: valueDefault} as IDataBufferVSM}/>
            </CardContent>
            
            <CardActions disableSpacing sx={{padding: 0, margin: 0}}>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    //aria-label="show more"
                >
                  <p> {orderItems.length}</p>
                  <ExpandMoreIcon  style={{transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)'}}/>
                </ExpandMore>
            </CardActions>
            <Collapse sx={{margin: 0, padding: 0, display: 'grid'}} in={expanded} timeout="auto" collapsedSize={0} unmountOnExit>
              {orderItems}
            </Collapse>
        </Card>
    )

}


export default Buffer;