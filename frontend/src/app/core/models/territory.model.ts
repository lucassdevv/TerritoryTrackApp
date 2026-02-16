
export interface TerritoryDetail{
    id: number;
    territoryNumber: number;
    mapColor: string;
    territoryType: string;
    blocks: Blocks[]
}

interface Blocks{
    id: number;
    territoryId: number;
    badge: string;
}