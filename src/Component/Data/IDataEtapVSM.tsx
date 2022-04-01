import IDataEtapSection from './IDataEtapSection'

interface IDataEtapVSM {
    id?: number;
    name?: string;
    actualAvailability?: number;
    actualTimeCircle?: number;
    actualTimePreporation?: number;
    defaultAvailability?: number;
    defaultTimeCircle?: number;
    defaultTimePreporation?: number;
    description?: string;
    etapSections?: IDataEtapSection[];

    parallel?: boolean;

    exeption?: string;
}


export default IDataEtapVSM;