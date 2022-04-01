import IDialogAddOrderItem from './IDialogAddOrderItem'

export default interface IDialogAddOrder
{
    name: string,
    priority: number,
    finishTime: IDataTime,
    products: IDialogAddOrderItem[]
}

export interface IDataTime
{
    data: IData;
    time: ITime;
}


export interface IData
{
    year: string;
    month: string;
    day: string;
}

export interface ITime
{
    hour: string;
    minute: string;
}

