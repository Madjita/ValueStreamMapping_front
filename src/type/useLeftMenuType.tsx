export enum useLeftMenuActionType{
    LEFT_SHOW = 'LEFT_SHOW',
    LEFT_HIDDEN = 'LEFT_HIDDEN',
    SET_WIDTH= 'SET_WIDTH'
}

export interface useLeftMenuType{
    drawerWidth: number,
    show: boolean,
    error: null | string
}

interface useLeftMenuActionSHOW{
    type : useLeftMenuActionType.LEFT_SHOW,
    payload: boolean,
}

interface useLeftMenuActionHIDDEN{
    type : useLeftMenuActionType.LEFT_HIDDEN,
    payload: boolean,
}

interface useLeftMenuActionWIDTH{
    type : useLeftMenuActionType.SET_WIDTH,
    payload: number,
}

export type useLeftMenuAction = useLeftMenuActionSHOW | useLeftMenuActionHIDDEN | useLeftMenuActionWIDTH