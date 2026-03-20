import { Component, computed, effect, inject, signal } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PublisherService } from "../../core/services/publisher.service";
import { OutingPlaceService } from "../../core/services/outing-place.service";
import { TerrritoryService } from "../../core/services/territory.service";
import { TerritoryRecordService } from "../../core/services/territory-record.service";
import { TerritoryRecordModel } from "../../core/models/territory-record.model";

@Component({
    templateUrl: './trecord-form.component.html',
    styleUrl: './trecord-form.component.css',
    imports: [ReactiveFormsModule]
})
export class TerritoryRecordFormComponent {
    private fb = inject(FormBuilder);
    private publisherService = inject(PublisherService);
    private outingPlaceService = inject(OutingPlaceService);
    private territoryService = inject(TerrritoryService);
    private territoryRecordService = inject(TerritoryRecordService);

    publishers = this.publisherService.publishers;
    outingPlaces = this.outingPlaceService.outingPlaces;

    territoryNumber = signal<number | undefined>(undefined);

    blocks = this.territoryService.getBlockByTerritoryNumber(this.territoryNumber);

    recordForm: FormGroup = this.fb.group({
        territoryNumber: ['', [Validators.required, Validators.min(1)]],
        publisherId: ['', [Validators.required]],
        outingPlaceId: ['', [Validators.required]],
        dateAssigned: ['', [Validators.required]],
        dateWorked: ['', [Validators.required]],
        isCompleted: [true, [Validators.required]],
        blocksId: this.fb.array([]),
        comment: ['']
    });

    isLoading = signal(false);
    successMessage = signal('');
    errorMessage = signal('');

    constructor() {
        // Automatically fetch blocks when territory number changes and the status is "incomplete"
        this.recordForm.get('territoryNumber')?.valueChanges.subscribe(val => {
            const num = val ? Number(val) : undefined;
            if (this.recordForm.get('isCompleted')?.value === false) {
                this.territoryNumber.set(num);
            } else {
                this.territoryNumber.set(undefined);
            }
        });

        this.recordForm.get('isCompleted')?.valueChanges.subscribe(isComplete => {
            if (isComplete === false) {
                this.territoryNumber.set(Number(this.recordForm.get('territoryNumber')?.value) || undefined);
            } else {
                this.territoryNumber.set(undefined);
                this.clearBlocks();
            }
        });

        // Initialize block checkboxes when blocks data lands
        effect(() => {
            const blocksData = this.blocks.value();
            if (blocksData?.blocks) {
                this.clearBlocks();
                blocksData.blocks.forEach(() => {
                    this.blocksIdArray.push(new FormControl(false));
                });
            }
        });
    }

    get blocksIdArray() {
        return this.recordForm.get('blocksId') as FormArray;
    }

    clearBlocks() {
        this.blocksIdArray.clear();
    }

    onSubmit() {
        this.successMessage.set('');
        this.errorMessage.set('');

        if (this.recordForm.invalid) {
            this.errorMessage.set('Por favor, completa todos los campos requeridos correctamente.');
            return;
        }

        const formValue = this.recordForm.value;

        // Collect selected block IDs
        let selectedBlockIds: number[] = [];
        if (!formValue.isCompleted && this.blocks.hasValue()) {
            const blocksData = this.blocks.value();
            if (blocksData?.blocks) {
                selectedBlockIds = formValue.blocksId
                    .map((checked: boolean, i: number) => checked ? blocksData.blocks[i].id : null)
                    .filter((v: number | null) => v !== null);

                if (selectedBlockIds.length === 0) {
                    this.errorMessage.set('Debes seleccionar al menos una manzana si el territorio está incompleto.');
                    return;
                }

                if (selectedBlockIds.length === blocksData.blocks.length) {
                    this.errorMessage.set('Si completaste todas las manzanas, marca la opción "Sí, completo" arriba.');
                    return;
                }
            }
        }

        this.isLoading.set(true);

        const payload: Partial<TerritoryRecordModel> = {
            territoryNumber: Number(formValue.territoryNumber),
            publisherId: Number(formValue.publisherId),
            outingPlaceId: Number(formValue.outingPlaceId),
            dateAssigned: formValue.dateAssigned as unknown as string, // Backend DTO and our Model now expect string
            dateWorked: formValue.dateWorked as unknown as string,
            allBlocksCompleted: formValue.isCompleted,
            comment: formValue.comment || undefined,
            // Blocks ID goes in payload dynamically
            ...(selectedBlockIds.length > 0 && { blocksId: selectedBlockIds })
        } as any; // Hack because we're omitting id and sending blocksId which isn't in GET model

        this.territoryRecordService.createRecord(payload).subscribe({
            next: () => {
                this.successMessage.set('Registro guardado exitosamente.');
                this.recordForm.reset({ isCompleted: true });
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Error al guardar el registro.');
                this.isLoading.set(false);
            }
        });
    }
}