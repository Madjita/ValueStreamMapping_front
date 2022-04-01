import {useLeftMenuType,useLeftMenuAction,useLeftMenuActionType } from '../../type/useLeftMenuType'

const initialState: useLeftMenuType ={
    drawerWidth: 240,
    show: false,
    error: null
}

export const  useLeftMenuReducer =(state = initialState, action:useLeftMenuAction): useLeftMenuType => {
    switch(action.type)
    {
        case useLeftMenuActionType.LEFT_SHOW:
            return {...state, show: true}
        break;
        case useLeftMenuActionType.LEFT_HIDDEN:
            return {...state, show: false}
        break;
        case useLeftMenuActionType.SET_WIDTH:
            return {...state, drawerWidth: action.payload}
        break;
        default:
            return state;
    }
}

