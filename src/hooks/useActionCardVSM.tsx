import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as ActionCardVSM from '../store/action-creator/useActionsCardVSM'


export const useActionCardVSM = () =>{
    const dispatch = useDispatch();
    return bindActionCreators(ActionCardVSM,dispatch);
}