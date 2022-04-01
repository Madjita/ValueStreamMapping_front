import React, { useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import DialogAddOrder from '../Dialog/DialogAddOrder'

import IDialogAddOrder from '../Data/Dialog/IDialogAddOrder'

import {Link,useHistory} from 'react-router-dom'


import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import {useSelector} from 'react-redux'
import { useTypedSelector } from '../../hooks/leftMenuSelector'

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

const LeftBar = (props:{addOrder: (value: IDialogAddOrder) => void}) =>{

    const theme = useTheme();
    const {drawerWidth,show} = useTypedSelector(state => state.leftMenu);

    const history = useHistory();



    const [flagSelect, setFlagSelect] = React.useState<any>();
    const onClick=(name: string)=>
    {
        switch(name)
        {
            case "Заказы":
                history.push('/');
            break;
            case "Заказы в работе":
               history.push('/orderInWork2');
               setFlagSelect(true);
            break;
            case "Заказы в архиве":
                history.push('/orderInArchive')
            break;
            case "Карты":
                  history.push('/cards')
            break;
            case "Добавить карту":
              history.push('/exel')
            break;
            case "Новый алгоритм":
              history.push('/new')
            break;
        }
    }

    return (
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={show}
      >
        <DrawerHeader>
         {/*
          <IconButton>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
         */}
        </DrawerHeader>
        <Divider />
        <List>
          {['Заказы', 'Заказы в работе', 'Заказы в архиве','Карты','Добавить карту'].map((text, index) => (
            <ListItem button key={text} onClick={() => onClick(text)}   > {/* style={{backgroundColor: flagSelect && index === 1 ? 'gray': ''}} */}
                <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    )
}


export default LeftBar;


/*
 <div className="leftBar">
            <div>
                <Paper elevation={0} style={{display: 'flex', justifyContent:'center'}}>
                    <p>Диплом</p>
                </Paper>
                <Paper elevation={3} sx={{overflow: 'auto',height: '100%', width: '100%'}}>
                   <DialogAddOrder addOrder={props.addOrder}/>
                </Paper>
                <Paper elevation={3} sx={{overflow: 'auto',height: '100%', width: '100%'}}>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/roster'>Roster</Link></li>
                    <li><Link to='/schedule'>Schedule</Link></li>
                </Paper>
            </div>
        </div>


*/