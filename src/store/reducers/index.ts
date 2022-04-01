import { combineReducers } from "redux";
import useCardVSMReducer from "./useCardVSMReducer";
import { useLeftMenuReducer } from "./useLeftMenuReducer";
import useOrdersReducer from "./useOrdersReducer";
import useProductionReducer from "./useProductionReducer";


export const rootReducer = combineReducers({
    leftMenu: useLeftMenuReducer,
    orders: useOrdersReducer,
    productions: useProductionReducer,
    cardVSM: useCardVSMReducer,
})


export type RootState = ReturnType<typeof rootReducer>