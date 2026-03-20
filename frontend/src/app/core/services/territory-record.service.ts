import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TerritoryRecordModel } from "../models/territory-record.model";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TerritoryRecordService {
    private http = inject(HttpClient);

    createRecord(record: Partial<TerritoryRecordModel>) {
        return this.http.post<TerritoryRecordModel>(`${environment.apiUrl}/territory-record`, record);
    }
}
