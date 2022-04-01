import IDataOrderItem from './IDataOrderItem';
import IUser from './IUser'

interface IDataEtapSection {
    id?: number;
    actualAvailability?: number;
    tActual?: number;
    tMax?: number;
    tMin?: number;

    actualTimePreporation?: number;
    defaultAvailability?: number;
    defaultTimeCircle?: number;
    defaultTimePreporation?: number;
    currentOrderItems?: IDataOrderItem
    user?: IUser
    etapVSMID?: number,
    exeption?: string;
}


export default IDataEtapSection;