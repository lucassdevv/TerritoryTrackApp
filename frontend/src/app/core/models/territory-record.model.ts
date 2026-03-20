import { Publisher } from "./publisher.model";
import { OutingPlace } from "./outing-place.model";

export interface TerritoryRecordModel {
    id: number;
    territoryNumber: number;
    publisherId: number;
    outingPlaceId: number;
    dateAssigned: string; // The backend formats this to dd/MM/yyyy
    dateWorked: string;
    dateCompleted: string | null;
    allBlocksCompleted: boolean;
    comment: string;
    
    // Relational data included from backend
    publisher?: Publisher;
    outingPlace?: OutingPlace;
    blockRecords?: {
        blockId: number;
        block?: { badge: string };
    }[];
}