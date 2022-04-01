import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionOrders from '../store/action-creator/useActionOrders'


export const useActionOrders = () =>{
    const dispatch = useDispatch();
    return bindActionCreators(ActionOrders,dispatch);
}