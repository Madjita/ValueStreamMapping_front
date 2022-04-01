import React,{useEffect, useState} from 'react'

import IDataCardSection from '../../Data/IDataCardSection'
import IDataOrderItem from '../../Data/IDataOrderItem'
import Divider from '@material-ui/core/Divider';
import ViewCard from '../ViewCard'

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@material-ui/system';


import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';

import IDataVSM from '../../Data/IDataVSM'
import IDataProduction from '../../Data/IDataProduction';
import IDataCardVSM from '../../Data/IDataCardVSM';
import { useCardVSMActionType, useProductionCardVSM } from '../../../type/useCardVSMType';

import { useActionCardVSM } from '../../../hooks/useActionCardVSM';
import { useTypedSelector } from '../../../hooks/leftMenuSelector';
import IDataOrder from '../../Data/IDataOrder';
import { MyCards, OrderMy } from '../../../type/useOrdersType';



const ViewCard_all =  (props: {sectionsCard: MyCards}) => {

    const [BDitems, setBDItem] = useState<IDataOrderItem[]>();

    const {cardVSMs, loading} = useTypedSelector(state => state.cardVSM);
    const {cardVSMLoading} = useActionCardVSM()

    const [card, setCard] = useState(cardVSMs);

    
    let cardSections = new Array as IDataCardSection[];
    let etapSection = new Array as IDataCardVSM[];

    console.log("props.sectionsCard: ", props.sectionsCard)

    for (let index = 0; index < props.sectionsCard.sections.length; index++) 
    {
        const element = props.sectionsCard.sections[index];

        if(index === 0)
        {
            etapSection.push(element);
        }
        else
        {
            if(element.etapNumeric === etapSection[0].etapNumeric)
            {
                etapSection.push(element);
            }
            else
            {
                let cardSection = new Object as IDataCardSection;
                cardSection.sections = etapSection.slice()
                cardSections.push(cardSection);

                etapSection = new Array as IDataCardVSM[];

                etapSection.push(element);
            }
        }
    }

    let cardSection = new Object as IDataCardSection;
    cardSection.sections = etapSection.slice()
    cardSections.push(cardSection);


    return(
        <div>
        <Card sx={{marginBottom: '150px'}}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <SettingsIcon />
                    </IconButton>
                }
                title={'\"'+props.sectionsCard.name + '\"'}
                sx={{fontWeight: 'bold',color: 'white', backgroundColor: '#575757'}}
                style={{color: 'white'}}
            >
                
            </CardHeader>
            <CardContent sx={{backgroundColor: 'rgba(0, 0, 0, .03)'}}>
                {/*<ViewCard sections={cardSections} /> */}
           </CardContent>
        </Card>
        </div>

    )


    
}


export default ViewCard_all;