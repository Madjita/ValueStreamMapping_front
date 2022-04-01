import IDatabufferVSMQueue from "../IDatabufferVSMQueue";
import IDataOrderItem from "../IDataOrderItem";
import OrderRole from "../OrderRole";

export  enum OrderRoleInProcess
{
    WaitUser = 1,
    WorkInUser = 2,
    WaitToGoNextSection = 3,
    Finishing = 4
}


export interface User_view
{
    name: string,
    userRole: number
    tActual: number;
    defaultTimeCircle: number;

    currentOrderItems: OrderProductionItem;
}

export interface Etap_view
{
    name: string,
    description: string,
    actualTimeCircle: number,
    defaultTimeCircle: number,
    actualTimePreporation: number,
    defaultTimePreporation: number,
    actualAvailability: number,
    defaultAvailability: number,
    parallel: boolean,
    users: User_view[]
}


export interface Buffer_view
{
    name: string,
    type: string,
    minHold: number,
    max: number,
    value: number,
    valueDefault: number,      
    replenishmentSec: number,
    replenishmentCount: number
    orderProductionItems: OrderProductionItem[]
}

export interface SectionEtap_view
{
    buffer_view: Buffer_view,
    etap_view: Etap_view
}


export interface SectionLogic_view
{
    sectionEtap_views: SectionEtap_view[]
}

//Модель данных для отображения
export interface Card_view
{
    name: string,
    sectionLogic_views: SectionLogic_view[],
    orders: Order_view[]
    
}


export interface OrderProductionItem
{
    _id: number;
    _nameOrder: string,
    _nameProduct: string,
    _name: string,
    role: OrderRole,
    _part: number,
    roleProcess: OrderRoleInProcess,
    _tActual: number
}

export interface OrderProduction_view
{
    name: string,
    orderRole: OrderRole,
    priority: number,
    quantity: number,
    simulation: boolean,
    tAdd: Date,
    tStart: Date,
    tStop: Date,
    tActual: number,
    tPlan: number,
    tFuture: number,

    orderProductionItems: OrderProductionItem[]
    card_View: Card_view
}

export default interface Order_view
{
    id?: number,
    name: string,
    orderRole: OrderRole ,
    priority: number,
    tAdd: Date,
    tStart: Date,
    tStop: Date,
    tActual: number,
    tPlan: number,
    tFuture: number,
    simulation: boolean,
    limitation: Date,

    orderProduction_views: OrderProduction_view[]
}
