export interface TerritoryRecordModel {
    territoryNumber: number;
    publisherId: number;
    outingPlaceId: number;
    dateAssigned: Date;
    dateWorked: Date;
    allBlocksCompleted: boolean;
    blocksId: number[];
    comment: string;

}