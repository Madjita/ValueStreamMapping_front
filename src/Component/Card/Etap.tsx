import React,{useState} from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IDataBufferVSM from '../Data/IDataBufferVSM';
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import IDataEtapVSM from '../Data/IDataEtapVSM'
import IUser from '../Data/IUser';
import IDataOrderItem from '../Data/IDataOrderItem';
import IDataOrder from '../Data/IDataOrderPart';
import SettingsIcon from '@material-ui/icons/Settings';
import IDataEtapSection from '../Data/IDataEtapSection';
import IDataOrderPart from '../Data/IDataOrderPart';
import { Etap_view, OrderProduction_view, User_view } from '../Data/IDataOrder/IDataOrder';
import moment from 'moment'

interface IDataResourceOrder
{
    user: IUser;
    orderItem: IDataOrderItem,
}

const Etap =  (props:{etap: Etap_view, orderProduct: OrderProduction_view}) => {

    const Colors = { RED: 'red', GREEN: 'green', YELLOW: 'yellow', WHITE: 'white', Header: '#6495ed'};

    const 
    {
        name
    } = props.etap

    const [information, setInformation] = useState({
        resources: new Array as IDataResourceOrder[],
        etap: new Object as IDataBufferVSM,
        show: true
      });

      


    const listResource = props.etap.users?.map((item: User_view, i: number)=>{

      let show = false;
      let findItemInProduct = undefined;
      if(item.currentOrderItems != undefined)
      {

       findItemInProduct = props.orderProduct.orderProductionItems?.filter(o=> o._nameOrder === item.currentOrderItems._nameOrder)

       if(findItemInProduct.length === 0)
       {
           //Не нешли
           show = false
           
       }
       else
       {
         show = true;
       }
      }


     

    /*  if(item.currentOrderItems === undefined)
      {
        
      }
      else
      {
      

       
      }*/

      


      if(item.name === 'Рабочий_8')
      {
        console.log(" fdf = ",item.userRole);
      }

        return  (
            <div key={i} style={{padding: '0px', margin: '0px'}}>
            <div  style={{fontWeight: 'bold',fontSize:'1rem', backgroundColor: "#7366bd", padding: '1px',textAlign: 'center', color: 'white', /*display: 'flex', justifyContent: 'space-between'*/}} >
              <p>{item.name}</p>
              <p>Время работы: {item.defaultTimeCircle} c</p>
            </div>
                    <div>
                    {
                       show && item.currentOrderItems ? 
                        <div style={{padding: 0, margin: 0,borderRight: '1px solid rgba(0, 0, 21, 0.125)', backgroundColor: Colors.YELLOW}}>
                          <p style={{display: 'flex', justifyContent:'center', fontWeight: 'bold'}} >{props.orderProduct.orderProductionItems[0]._nameOrder}</p>
                          <div style={{display: 'flex', justifyContent:'space-around'}} >
                            <p>№ Текущего заказа</p>
                            <p>Всего заказов</p>
                          </div>
                         <div style={{display: 'flex', justifyContent:'space-around'}} >
                            <p>{item.currentOrderItems._part}</p>
                            <p>{props.orderProduct.orderProductionItems.length}</p>
                          </div>
                          <p style={{display: 'flex', justifyContent:'center'}} >Время выполнения</p>
                          <p style={{display: 'flex', justifyContent:'center', fontWeight: 'bold'}}>{item.tActual}</p>
  
                          <p style={{display: 'flex', justifyContent:'center'}} >Общее время заказа</p>
                          <p style={{display: 'flex', justifyContent:'center', fontWeight: 'bold'}}>{moment.unix(item.currentOrderItems._tActual).utc().format('HH:mm:ss')}</p>
                        </div>
                      :
                      
                      item.currentOrderItems ? 
                      <div style={{padding: 0, margin: 0,borderRight: '1px solid rgba(0, 0, 21, 0.125)', backgroundColor: Colors.YELLOW}}>
                         <p style={{display: 'flex', justifyContent:'center'}} >Занят другим заказом</p>
                      </div>
                      :
                      item?.userRole  === 2 ?
                        <div style={{padding: 0, margin: 0,borderRight: '1px solid rgba(0, 0, 21, 0.125)', backgroundColor: Colors.YELLOW}}>
                          <p style={{display: 'flex', justifyContent:'center'}} >Занят на другом этапе</p>
                        </div>
                        :
                        
                        item?.userRole === 3 ? 
                              <div style={{padding: 0, margin: 0,borderRight: '1px solid rgba(0, 0, 21, 0.125)', backgroundColor: Colors.YELLOW}}>
                              <p style={{display: 'flex', justifyContent:'center'}} >Ожидает деталей в буфер</p>
                            </div>
                            :
                            <div style={{padding: 0, margin: 0,borderRight: '1px solid rgba(0, 0, 21, 0.125)', backgroundColor: Colors.GREEN}}>
                                <p style={{display: 'flex', justifyContent:'center'}} >Свободен</p>
                            </div>


                    }
                    </div>
  
              </div>
        )
    })
    
    return(
        <Card sx={{ maxWidth: 250,verticalAlign: 'middle', textAlign: 'center', wordWrap: 'break-word' }}>
            <CardHeader
            action={
                <IconButton aria-label="settings">
                  <SettingsIcon />
                </IconButton>
              }
            title={name}
            sx={{fontWeight: 'bold', backgroundColor: Colors.Header,color: 'white',paddingBottom: '0px'}}>

            </CardHeader>
            <div  style={{fontWeight: 'bold',fontSize:'1rem',backgroundColor: Colors.Header,color: 'white', display: 'flex', justifyContent: 'space-around'}}>
              <p>Время цикла:</p>
              <p>{props.etap.defaultTimeCircle}</p>
            </div>
            <CardContent sx={{padding: '0px', margin: '0px'}}>
                {listResource}
            </CardContent>
        </Card>
    )

}


export default Etap;