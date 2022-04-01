import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionProduction from '../store/action-creator/useActionProduction'


export const useActionProduction = () =>{
    const dispatch = useDispatch();
    return bindActionCreators(ActionProduction,dispatch);
}