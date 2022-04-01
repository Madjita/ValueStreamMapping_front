import React from 'react'
import Toolbar from '@material-ui/core/Toolbar';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';



import { useTypedSelector } from '../../hooks/leftMenuSelector'
import { useLeftMenuAction } from '../../hooks/useLeftMenuAction';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Header = () =>{

  const {show} = useTypedSelector(state => state.leftMenu);
  const {showMenu,hiddenMenu} = useLeftMenuAction();
  

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {

    //console.log("show = ",show)
    if(show)
    {
      hiddenMenu();
      setOpen(false)
    }
    else
    {
      showMenu()
      setOpen(true);
    }

  };

    return (
      <AppBar position="fixed" open={open}>
      <Toolbar sx={{position:'relative'}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawer}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
       {/* <Typography variant="h6" noWrap component="div">
            Заказы в работе
        </Typography>*/}
      </Toolbar>
      </AppBar>

    )
}


export default Header;




/*
 && { display: 'none' }

  <AppBar style={{width: 'calc(100% - 240px)'}}>
        <Toolbar style={{ minHeight: '48px' }}>
          <Tabs
          TabIndicatorProps={{style: {background:'white'}}}
          value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab style={{ color: 'white', fontSize: value === 0 ? '20px': '' }}label="Заказы" {...a11yProps(0)} />
            <Tab style={{color: 'white', fontSize: value === 1 ? '20px': '' }} label="Заказы в работе" {...a11yProps(1)} />
            <Tab style={{color: 'white', fontSize: value === 2 ? '20px': '' }} label="Заказы в архиве" {...a11yProps(2)} />
          </Tabs>
        </Toolbar>
        </AppBar>

*/