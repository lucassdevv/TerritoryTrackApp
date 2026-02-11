import { httpResource } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OutingPlace } from "../models/outing-place.model";
import { environment } from "../../../../environments/environment";

@Injectable({providedIn: 'root'})
export class OutingPlaceService{
    outingPlaces = httpResource<OutingPlace[]>(()=>  `${environment.apiUrl}/outing-places`)
}