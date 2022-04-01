import IDataOrderPart from './IDataOrderPart'

interface IDataProduction {
    id?: number;
    name?: string;
    orders?: IDataOrderPart[]
}

export default IDataProduction;