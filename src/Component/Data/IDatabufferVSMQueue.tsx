import IDataOrderItem from "./IDataOrderItem";

export enum BufferRole {
    Wait = 1,
    Archive = 2,
    Stop = 3,
}

export default interface IDatabufferVSMQueue {
    id?: number;
    bufferRole?: BufferRole;

    tAdd?: any;
    tPop?: any;
    tWait?: any;
    tFuture?: any;

    currentOrderItems: IDataOrderItem
}
