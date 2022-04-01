import IDataCardSection from '../Component/Data/IDataCardSection'
import IDataCardVSM from '../Component/Data/IDataCardVSM'

export enum useCardVSMActionType{
    FETCH_CARDVSM = 'FETCH_CARDVSM',
    FETCH_CARDVSM_SUCCESS = 'FETCH_CARDVSM_SUCCESS',
    FETCH_CARDVSM_ERROR = 'FETCH_CARDVSM_ERROR'
}

export interface useProductionCardVSM{
    name: string,
    sections: IDataCardSection[]
} 

export interface useCardVSMType{
    cardVSMs: useProductionCardVSM[],
    loading: boolean,
    error: null | string
}

interface FetchCardVSMAction{
    type : useCardVSMActionType.FETCH_CARDVSM,
}

interface FetchCardVSMActionSuccess{
    type : useCardVSMActionType.FETCH_CARDVSM_SUCCESS,
    payload: IDataCardVSM[],
}

interface FetchCardVSMActionError{
    type : useCardVSMActionType.FETCH_CARDVSM_ERROR,
    payload: string,
}

export type useLeftMenuAction = FetchCardVSMAction | FetchCardVSMActionSuccess | FetchCardVSMActionError