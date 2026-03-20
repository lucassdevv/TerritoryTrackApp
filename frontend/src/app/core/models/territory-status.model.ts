export interface TerritoryStatusModel {
    id: number;
    territoryNumber: number;
    mapColor: string;
    territoryType: string;
    status: 'COMPLETADO' | 'INCOMPLETO' | 'VENCIDO' | 'INDOCUMENTADO';
}
