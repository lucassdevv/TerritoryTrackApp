import { httpResource } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Publisher } from "../models/publisher.model";
import { environment } from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class PublisherService{
    publishers = httpResource<Publisher[]>(()=> `${environment.apiUrl}/publishers`);
}