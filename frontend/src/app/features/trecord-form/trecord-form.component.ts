import { Component, inject } from "@angular/core";
import { PublisherService } from "../../core/services/publisher.service";
import { OutingPlaceService } from "../../core/services/outing-place.service";

@Component({
    templateUrl: './trecord-form.component.html'
})

export class TerritoryRecordFormComponent{
    private publisherService = inject(PublisherService)
    private outingPlaceService = inject(OutingPlaceService)
    publishers = this.publisherService.publishers
    outingPlaces = this.outingPlaceService.outingPlaces
}