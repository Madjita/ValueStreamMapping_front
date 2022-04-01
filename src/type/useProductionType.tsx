import IDataProduction from '../Component/Data/IDataProduction'

export enum useOrdersActionType{
    FETCH_PRODUCTIONS = 'FETCH_PRODUCTIONS',
    FETCH_PRODUCTIONS_SUCCESS = 'FETCH_PRODUCTIONS_SUCCESS',
    FETCH_PRODUCTIONS_ERROR = 'FETCH_PRODUCTIONS_ERROR'
}

export interface useProductionType{
    productions: IDataProduction[],
    loading: boolean,
    error: null | string
}

interface FetchProductionAction{
    type : useOrdersActionType.FETCH_PRODUCTIONS,
}

interface FetchProductionSuccess{
    type : useOrdersActionType.FETCH_PRODUCTIONS_SUCCESS,
    payload: IDataProduction[],
}

interface FetchProductionError{
    type : useOrdersActionType.FETCH_PRODUCTIONS_ERROR,
    payload: string,
}

export type useLeftMenuAction = FetchProductionAction | FetchProductionSuccess | FetchProductionError