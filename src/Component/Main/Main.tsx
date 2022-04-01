import React from 'react'
import Paper from '@material-ui/core/Paper'
import CustomizedAccordions from '../CustomizedAccordions'

import { styled, useTheme } from '@mui/material/styles';

import { Switch, Route } from 'react-router-dom'
import { useTypedSelector } from '../../hooks/leftMenuSelector'
import PageOrderInWork from '../Pages/PageOrderInWork';
import PageOrdersDefault from '../Pages/PageOrdersDefault';
import PageOrderInArchive from '../Pages/PageOrderInArchive';
import PageInformationAboutOrder from '../Pages/PageInformationAboutOrder'
import PageExel from '../Pages/PageExel';
import PageAllCards from '../Pages/PageAllCards';
import PageNewAlgoritm from '../Pages/PageNewAlgoritm';
import PageNewAlgoritmAddOrder from '../Pages/PageNewAlgoritmAddOrder';
import CustomizedAccordionsNewAlgoritm from '../CustomizedAccordionsNewAlgoritm';


const drawerWidth = 240
const MyMain = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
   /* padding: theme.spacing(3),*/
    paddingTop: '65px',
    height: '100%', 
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));


const Main = (props:{newOrder: any}) =>{

const {show} = useTypedSelector(state => state.leftMenu);



  
    return (
        <MyMain open={show} >
            <Paper elevation={0} sx={{overflow: 'auto',height: '100%', width: '100%'}}>
                <Switch>
                    <Route exact path='/' component={PageNewAlgoritmAddOrder}/>
                   {/* <Route exact path='/' component={PageOrdersDefault}/> */}
                    
                  
                    <Route exact path='/orderInfo' component={PageInformationAboutOrder}/>
                    <Route exact path='/orderInArchive' component={PageOrderInArchive}/>
                    <Route exact path='/exel' component={PageExel}/>
                    <Route exact path='/cards' component={PageNewAlgoritm}/> {/*PageAllCards*/}
                    <Route exact path='/newAddOrder' component={PageNewAlgoritmAddOrder}/>
                    {/*<PageOrderInWork/>*/}
                    <Route exact path='/orderInWork2' component={CustomizedAccordionsNewAlgoritm}/>
                </Switch>
            </Paper>
        </MyMain>
    )
}


export default Main;

// <CustomizedAccordions newOrder={props.newOrder as any}/>

/*
<Switch>
                <Route exact path='/' component={CustomizedAccordions}/>
</Switch>

*/