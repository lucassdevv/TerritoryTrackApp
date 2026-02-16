import { Component, computed, inject, signal } from "@angular/core";
import { PublisherService } from "../../core/services/publisher.service";
import { OutingPlaceService } from "../../core/services/outing-place.service";
import { FormBuilder, FormGroup, UntypedFormArray } from "@angular/forms";
import { TerrritoryService } from "../../core/services/territory.service";

@Component({
    templateUrl: './trecord-form.component.html',
    styleUrl: './a.css'
})

export class TerritoryRecordFormComponent{
    constructor(private fb: FormBuilder) {}

    private publisherService = inject(PublisherService)
    private outingPlaceService = inject(OutingPlaceService)
    private territoryService = inject(TerrritoryService)

    publishers = this.publisherService.publishers
    outingPlaces = this.outingPlaceService.outingPlaces

    territoryNumber = signal(0)
    isCompleted = signal<boolean>(true)

    targetTerritoryNumber = computed(()=>{
        
        if (this.isCompleted() === false && this.territoryNumber() > 0){
            return this.territoryNumber()
        }
        return undefined
    })

    blocks = this.territoryService.getBlockByTerritoryNumber(this.targetTerritoryNumber)

    onTerritoryChange(event: Event){
        const input = event.target as HTMLInputElement
        this.territoryNumber.set(+input.value)
    }

    
}