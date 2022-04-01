import IDataOrderItem from './IDataOrderItem'
import OrderRole from './OrderRole'
	


interface IDataOrderCurrentSection {
    id?: number
    actualEtapVSMId : number
    actualEtapSectionsId: number;
    actualBufferVSMId: number;
    orderItem: IDataOrderItem;
    orderSectionState: OrderRole;
}

export default IDataOrderCurrentSection;