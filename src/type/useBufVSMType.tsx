import IDataBufferVSM from '../Component/Data/IDataBufferVSM'
import IDataOrderItem from '../Component/Data/IDataOrderItem'
import IDataProduction from '../Component/Data/IDataProduction'

export enum useOrdersActionType{
    FETCH_BUF = 'FETCH_BUF',
    FETCH_BUF_SUCCESS = 'FETCH_BUF_SUCCESS',
    FETCH_BUF_ERROR = 'FETCH_BUF_ERROR'
}


export interface BuferType {
    buf: IDataBufferVSM,
    orders: IDataOrderItem[]
}

export interface useBufVSMType{
    bufInformation: BuferType,
    loading: boolean,
    error: null | string
}

interface FetchBufAction{
    type : useOrdersActionType.FETCH_BUF,
}

interface FetchBufSuccess{
    type : useOrdersActionType.FETCH_BUF_SUCCESS,
    payload: BuferType,
}

interface FetchBufError{
    type : useOrdersActionType.FETCH_BUF_ERROR,
    payload: string,
}

export type useLeftMenuAction = FetchBufAction | FetchBufSuccess | FetchBufError