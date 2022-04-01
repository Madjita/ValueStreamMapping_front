import IDataOrderItems from './IDataOrderItem'
import IDataProduction from './IDataProduction';
import IDataOrder from './IDataOrder'

interface IDataOrderPart {
    id: number,
    quantity : number,
    simulation : false,
    tAdd : number,
    tStart : number,
    tStop : number,
    tActual : number,
    tPlan : number,

    productionsId : number,
    production: IDataProduction,
    orders_production_items? : IDataOrderItems[],
    order : IDataOrder

}

export default IDataOrderPart;