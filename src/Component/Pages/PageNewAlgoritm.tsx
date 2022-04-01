import  React, { useEffect,useState } from 'react'
import axios from 'axios'
import serverApiHost from "../../global";


import ViewAllCards from '../Card/AllCardsView/ViewAllCards'
import IDataCardVSM from '../../Component/Data/IDataCardVSM'
import { Divider, ListItemIcon, ListItemText, MenuItem, MenuList } from '@material-ui/core';
import { Check } from '@material-ui/icons';


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MyCards } from '../../type/useOrdersType';
import ViewAllCards_newAlgoritm from '../Card/AllCardsView/ViewAllCards_newAlgoritm';
import ChartLine from '../Charts/ChartLine';

//////////




interface User_view
{
    name: string,
    userRole: number

}

interface Etap_view
{
    name: string,
    description: string,
    actualTimeCircle: number,
    defaultTimeCircle: number,
    actualTimePreporation: number,
    defaultTimePreporation: number,
    actualAvailability: number,
    defaultAvailability: number,
    parallel: boolean,
    users: User_view[]
}

interface Buffer_view
{
    name: string,
    type: string,
    minHold: number,
    max: number,
    value: number,
    valueDefault: number,      
    replenishmentSec: number,
    replenishmentCount: number
}

interface SectionEtap_view
{
    buffer_view: Buffer_view,
    etap_view: Etap_view
}


interface SectionLogic_view
{
    sectionEtap_views: SectionEtap_view[]
}

//Модель данных для отображения
interface Card_view
{
    name: string,
    sectionLogic_views: SectionLogic_view[]
}



/////////




interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        style= {{width: '100%'}}
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
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
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  

const PageNewAlgoritm = () =>
{
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };


    const tabStyle = {
        default_tab:{
            color: '#68C222',
            width: '33.3%',
            backgroundColor: '#FFFFFF',
            fontSize: 15
        },
        active_tab:{
            color: 'grey700',
            width: '33.3%',
            backgroundColor: '#FFFFFF',
            fontSize: 15
        }
    };

    const getStyle =  (isActive: any)  => {
        return isActive ? tabStyle.active_tab : tabStyle.default_tab
    }
    

    const [dataCards, setDataCards] = useState<Card_view[]>()

    const GetInformationAboutCard = async () => {
       
        const response = await axios.get('http://'+serverApiHost+':5000/api/cardVSM/view')

        if(response.status != 200)
        {
          return ;
        }

        let content = response.data as any;

        let card =  content.cards  as Card_view[];
        setDataCards(card);
        console.log("LOADING = ",card)
    }


    useEffect(() => {
         GetInformationAboutCard();
    },[])
    

    if(dataCards === undefined)
    {
        return <div>

        </div>;
    }   
    
    return (
        <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
        >
                <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider',}}
                TabIndicatorProps={{style: {background:'green',color: 'black' }}}
            >
                    {dataCards.map( (item: Card_view,i: number) => {
                            return   <Tab  
                                            label={<span style={{ color: value === i ?'white':'black', width: '100%', wordWrap: '-moz-initial' }}>{item.name}</span>}
                                            {...a11yProps(0)}  
                                            sx={{width: '100%', backgroundColor: value === i ? 'gray': 'white', }}/>
                        })}
            </Tabs>
            {dataCards.map( (item: Card_view,i: number) => {
                return  <TabPanel value={value} index={i}>
                    {/*<ViewAllCards key={i} item={item}/>*/}
                    <ViewAllCards_newAlgoritm key={i} item={item}/>
                    
                </TabPanel>
            })}
        </Box>
    )   
}


export default PageNewAlgoritm;