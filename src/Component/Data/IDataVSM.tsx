import IDataCardSection from './IDataCardSection'

interface IDataVSM
{
    name?: string,
    TActual: number,
    TPlan?: number,
    sections: IDataCardSection[]
}

export default IDataVSM;