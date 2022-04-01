import { useLeftMenuActionType } from "../../type/useLeftMenuType"

export const showMenu = () => ({type: useLeftMenuActionType.LEFT_SHOW})
export const hiddenMenu = () => ({type: useLeftMenuActionType.LEFT_HIDDEN})
export const setWidthMenu = (drawerWidth: number) => ({type: useLeftMenuActionType.LEFT_HIDDEN, payload: drawerWidth})
