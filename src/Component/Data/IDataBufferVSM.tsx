import IDatabufferVSMQueue from "./IDatabufferVSMQueue";

interface IDataBufferVSM {
    id?: number;
    max?: number;
    minHold?: number;
    name?: string;
    replenishmentCount?: number;
    replenishmentSec?: number;
    type?: string;
    value?: number;
    valueDefault?: number;
    exeption?: string;

    bufferVSMQueue: IDatabufferVSMQueue[];
}


export default IDataBufferVSM;