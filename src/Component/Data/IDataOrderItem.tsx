import IDataOrder from './IDataOrderPart'
import IDataOrderCurrentSection from './IDataOrderCurrentSection'
import IDataOrderPart from './IDataOrderPart'
import OrderRole from './OrderRole'	


interface IDataOrderItem {
    id?: number
    orders_production: IDataOrderPart
    part?: number   //Колчиство деталей в партии
    name?: string   
    orderRole? : OrderRole
    priority? : number
    tStart? : Date
    tStop? : Date
    tDefault?: number
    tActual?: number
    tFuture?: number
    simulation: boolean
    actualEtapVSMId : number
    actualEtapSectionsId: number;
    actualBufferVSMId: number;
    
    //orderCurrentSection: IDataOrderCurrentSection[]
}

export default IDataOrderItem;