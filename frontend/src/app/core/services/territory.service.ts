import { httpResource } from "@angular/common/http";
import { Injectable, Signal, signal } from "@angular/core";
import { TerritoryDetail } from "../models/territory.model";
import { environment } from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class TerrritoryService{
    getBlockByTerritoryNumber(territoryNum: Signal<number | undefined>){
        
       return httpResource<TerritoryDetail>(()=>{
            const num = territoryNum()
            if (num === undefined){return undefined}
            return `${environment.apiUrl}/territories/${num}`
        })
    }
}
