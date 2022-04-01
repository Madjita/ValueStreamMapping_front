import IDataOrderItems from './IDataOrderItem'
import IDataProduction from './IDataProduction';
import IDataOrderPart from './IDataOrderPart';
import OrderRole from './OrderRole'

interface IDataOrder {
    id: number,
    name: string,
    orderRole: OrderRole,
    priority: number,
    simulation : boolean,
    
    tAdd : string,
    tStart : string,
    tStop : string,
    tActual : number,
    tPlan : number,
    tFuture: number
    
    orders_production: IDataOrderPart[]
}

export default IDataOrder;