import axios from "axios"
import { Dispatch } from "react"
import IDataOrder from "../../Component/Data/IDataOrder"
import { useOrdersActionType,useLeftMenuAction } from "../../type/useOrdersType"

import {  fetch_cardVSM, 
    fetch_cardVSM_success, 
    fetch_cardVSM_error,
    fetch_cardVSM_add 
 } from '../reducers/useCardVSMReducer'


import IDialogAddOrder from '../../Component/Data/Dialog/IDialogAddOrder'

import ip,{port} from '../../global'
import IDataProduction from "../../Component/Data/IDataProduction"
import { useCardVSMType, useProductionCardVSM } from "../../type/useCardVSMType"
import IDataCardVSM from "../../Component/Data/IDataCardVSM"


interface productionCardVSM{
    name: string,
    productions: IDataCardVSM[]
}
interface IDataCardProduct{
    cardVSMs: productionCardVSM[]
}

export const cardVSMLoading = (order: IDataOrder) => {
    return async (dispatch: any) => {

        try{
           // dispatch(fetch_orders());
            //const response = await axios.get('https://jsonplaceholder.typicode.com/users')

            dispatch(fetch_cardVSM());

     

            const response = await axios.post('http://'+ip+':'+port+'/api/cardVSM/get',
            order
            ,{
                withCredentials: false,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  'Content-Type': 'application/json'
                },
            })

            
           const data = response.data as any;
           console.log("Get card = ", data);

            setTimeout(() => {
                dispatch(fetch_cardVSM_success(data.cardVSMs));
            }, 0)
        } catch(e) {
            dispatch(fetch_cardVSM_error('Error'));
        }
    }
}