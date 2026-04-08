import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TerritoryRecordModel } from "../models/territory-record.model";
import { S13Report } from "../models/s13-report.model";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class TerritoryRecordService {
    private http = inject(HttpClient);

    createRecord(record: Partial<TerritoryRecordModel>) {
        return this.http.post<TerritoryRecordModel>(`${environment.apiUrl}/territory-record`, record);
    }

    getS13Report(serviceYear?: number) {
        const params = serviceYear ? `?serviceYear=${serviceYear}` : '';
        return this.http.get<S13Report>(`${environment.apiUrl}/territory-record/s13-report${params}`);
    }
}
