import axios from "axios"
import { Dispatch } from "react"
import IDataOrder from "../../Component/Data/IDataOrder"
import { useOrdersActionType,useLeftMenuAction, OrderMy } from "../../type/useOrdersType"

import { fetch_orders, fetch_orders_success, fetch_orders_error,fetch_orders_add,fetch_orders_update,fetch_orders_success2 } from '../reducers/useOrdersReducer'


import IDialogAddOrder from '../../Component/Data/Dialog/IDialogAddOrder'

import ip,{port} from '../../global'
import IDataCardVSM from "../../Component/Data/IDataCardVSM"
import IDataProduction from "../../Component/Data/IDataProduction"

export const ordersLoading = () => {

    return async (dispatch: any) => {

        try{
            dispatch(fetch_orders());

            const response = await axios.get('http://'+ip+':'+port+'/api/manufacture/orders',{
                withCredentials: false,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                },
            })

            
            let data = response.data as IDataOrder[];
            setTimeout(() => {

               /* data.map((item:IDataOrder )=>{
                    if(item.tActual != 0)
                    {
                        //console.log("fetch_orders_update = " +item.tActual);
                        dispatch(fetch_orders_update(item))
                    }
                })*/

                dispatch(fetch_orders_success(data));
            }, 0)
        } catch(e) {
            dispatch(fetch_orders_error('Error'));
        }
    }
}



export const ordersLoading2 = () => {
    return async (dispatch: any) => {

        try{
            dispatch(fetch_orders());

            const response = await axios.get('http://'+ip+':'+port+'/api/manufacture/orders2',{
                withCredentials: false,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                },
            })



            let df  = response.data as OrderMy;

            setTimeout(() => {

               /* data.map((item:IDataOrder )=>{
                    if(item.tActual != 0)
                    {
                        //console.log("fetch_orders_update = " +item.tActual);
                        dispatch(fetch_orders_update(item))
                    }
                })*/

                dispatch(fetch_orders_success2(df));
            }, 0)
        } catch(e) {
            dispatch(fetch_orders_error('Error'));
        }
    }
}


export const orderAdd = (newOrder: IDialogAddOrder) => {
    return async (dispatch: any) => {

        console.log("Add")
        console.log(newOrder)
        console.log(JSON.stringify(newOrder))
        try{

            //const response = await axios.get('https://jsonplaceholder.typicode.com/users')

            const response = await axios.post('http://'+ip+':'+port+'/api/manufacture/addOrder',JSON.stringify(newOrder),{
                headers: {
                  // Overwrite Axios's automatically set Content-Type
                  "Access-Control-Allow-Origin": "*",
                  'Content-Type': 'application/json'
                }
              })

            if(response.status === 200)
            {
                dispatch(fetch_orders_add(newOrder));
                console.log("Add Ok")
            }
        } catch(e) {
            dispatch(fetch_orders_error('Error'));
        }
    }
}

export const orderUpdate = (updateOrder: IDataOrder, oldOrder: IDataOrder) => {
    return async (dispatch: any) => {
        let obj = {newOrder: updateOrder , oldOrder: oldOrder}
        try{
            const response = await axios.post('http://'+ip+':'+port+'/api/manufacture/updateOrder',JSON.stringify(obj),{
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  'Content-Type': 'application/json'
                }
              })

            if(response.status === 200)
            {
                dispatch(fetch_orders_update(obj));
                console.log("Add Ok")
            }
        } catch(e) {
            dispatch(fetch_orders_error('Error'));
        }
    }
}


export const startSimulation = (item: IDataOrder) => {
    return async (dispatch: any) => {

        let copyObjet = {...item}
        try
        {
            const response = await axios.post('http://'+ip+':'+port+'/api/manufacture/startSimulationOrder',JSON.stringify(copyObjet),
            {
                headers: {
                   "Access-Control-Allow-Origin": "*",
                  'Content-Type': 'application/json'
                }
            })

            if(response.status === 200)
            {
                //dispatch(fetch_orders_update(obj));
                console.log("Add Ok")
            }
        } catch(e) {
            dispatch(fetch_orders_error('Error'));
        }
    }
}


export const updateInfoOrder = (item: IDataOrder) => {
    return async (dispatch: any) => {

        //let copyObjet = {...item}
        try
        {
            const response = await axios.post('http://'+ip+':'+port+'/api/manufacture/updateInfoOrder',item,
            {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  'Content-Type': 'application/json'
                }
            })

            if(response.status === 200)
            {

               
                let data = response.data as IDataOrder;

                console.log("Update item =", data.tActual)
                dispatch(fetch_orders_update(data));
            }
        } catch(e) {
            dispatch(fetch_orders_error('Error'));
        }
    }
}



