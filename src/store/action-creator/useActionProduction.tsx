
import axios from "axios"
import { Dispatch } from "react"
import IDataOrder from "../../Component/Data/IDataOrder"
import { useOrdersActionType,useLeftMenuAction } from "../../type/useOrdersType"

import { fetch_productions, fetch_productions_success , fetch_productions_error} from '../reducers/useProductionReducer'


import IDialogAddOrder from '../../Component/Data/Dialog/IDialogAddOrder'

import ip,{port} from '../../global'

export const getAllProducts = () =>{
    return async (dispatch: any) => {

        console.log("getAllProducts")
        try{
            dispatch(fetch_productions());

            const response = await axios.get('http://'+ip+':'+port+'/api/manufacture/getAllProducts',)

            if(response.status === 200)
            {
                let data = response.data as IDataOrder[];
                console.log("Loading finish getAllProducts")
                console.log(data)
                setTimeout(() => {
                    dispatch(fetch_productions_success(data));
                }, 0)
            }
        } catch(e) {
            dispatch(fetch_productions_error('Error'));
        }
    }
}
