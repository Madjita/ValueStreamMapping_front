import IDataCardVSM from '../Component/Data/IDataCardVSM'
import IDataOrder,{} from '../Component/Data/IDataOrder'

export enum useOrdersActionType{
    FETCH_ORDERS = 'FETCH_ORDERS',
    FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS',
    FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR'
}

export interface useOrdersType{
    orders: IDataOrder[],
    orders2: OrderMy[],
    loading: boolean,
    changeList: boolean,
    error: null | string
}

//
export interface MyCards {
    name: string,
    sections: IDataCardVSM[]
} 

export interface OrderMy{
    order: IDataOrder,
    cards: MyCards[]
}
//


interface FetchOrdersAction{
    type : useOrdersActionType.FETCH_ORDERS,
}

interface FetchOrdersActionSuccess{
    type : useOrdersActionType.FETCH_ORDERS_SUCCESS,
    payload: IDataOrder[],
}

interface FetchOrdersActionError{
    type : useOrdersActionType.FETCH_ORDERS_ERROR,
    payload: string,
}

export type useLeftMenuAction = FetchOrdersAction | FetchOrdersActionSuccess | FetchOrdersActionError