import IDataBufferVSM from './IDataBufferVSM'
import IDataEtapVSM from './IDataEtapVSM'
import IDataResultVSM from './IDataResultVSM'

interface IDataCardVSM {
    id?: number;
    etapNumeric?: number;
    bufferVSM?: IDataBufferVSM;
    etapVSM?: IDataEtapVSM;
    resultVSM?: IDataResultVSM; 
    exeption?: string;
}

export default IDataCardVSM;