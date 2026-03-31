import { Component, computed, inject, signal, effect } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { TerritoryStatusModel } from "../../core/models/territory-status.model";
import { TerritoryRecordModel } from "../../core/models/territory-record.model";
import { environment } from "../../../../environments/environment";

type StatusFilter = 'Todos' | 'COMPLETADO' | 'INCOMPLETO' | 'VENCIDO' | 'INDOCUMENTADO';
type DaysFilter = 14 | 30 | 60;

@Component({
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private http = inject(HttpClient);

  activeStatusFilter = signal<StatusFilter>('Todos');
  activeDaysFilter = signal<DaysFilter>(14);
  
  expandedRow = signal<TerritoryStatusModel | null>(null);
  expandedHistory = signal<TerritoryRecordModel[]>([]);
  isHistoryLoading = signal(false);

  // Fetch territories based on active days filter
  territories = computed(() => {
    const days = this.activeDaysFilter();
    return this.http.get<TerritoryStatusModel[]>(`${environment.apiUrl}/territories/status?days=${days}`);
  });

  // Derived signal: territories filtered by status (unwraps the observable manually in the template using async pipe or we can just subscribe. 
  // Let's use a simpler approach for Angular 18: use a signal to hold the fetched raw data.
  
  territoriesData = signal<TerritoryStatusModel[]>([]);
  isLoading = signal(false);

  constructor() {
    // Watch for changes in days filter and fetch new data
    effect(() => {
       const days = this.activeDaysFilter();
       this.fetchTerritoriesData(days);
    });
  }

  fetchTerritoriesData(days: number) {
     this.isLoading.set(true);
     this.http.get<TerritoryStatusModel[]>(`${environment.apiUrl}/territories/status?days=${days}`)
       .subscribe({
         next: (data) => {
           this.territoriesData.set(data);
           this.isLoading.set(false);
         },
         error: () => this.isLoading.set(false)
       });
  }

  // Derived signal for table display
  filteredEntries = computed(() => {
    const filter = this.activeStatusFilter();
    const data = this.territoriesData();
    if (filter === 'Todos') return data;
    return data.filter(t => t.status === filter);
  });

  setDaysFilter(days: DaysFilter) {
    this.activeDaysFilter.set(days);
    this.expandedRow.set(null);
  }

  setStatusFilter(filter: StatusFilter) {
    this.activeStatusFilter.set(filter);
    this.expandedRow.set(null); 
  }

  toggleRow(entry: TerritoryStatusModel) {
    if (this.expandedRow()?.id === entry.id) {
      this.expandedRow.set(null);
    } else {
      this.expandedRow.set(entry);
      this.fetchTerritoryHistory(entry.territoryNumber);
    }
  }

  fetchTerritoryHistory(territoryNumber: number) {
    this.isHistoryLoading.set(true);
    this.expandedHistory.set([]);
    
    // We use byterritory endpoint using territoryNumber since Prisma looks for PK vs Number? Wait, backend says ParseIntPipe territoryId. I need to make sure I pass territory.id. 
    // Yes, territory.findUnique used territoryNumber. In backend `territory-record/byterritory?territoryid=X` so it wants the ID, not the number.
    // const territoryId = this.expandedRow()?.id; // This line is no longer needed as we use territoryNumber directly

    // if (!territoryId) return; // This check is no longer needed

    // Fetch historical records
    this.http.get<TerritoryRecordModel[]>(`${environment.apiUrl}/territory-record/byterritory?territoryid=${territoryNumber}`)
      .subscribe({
        next: (records) => {
          // Sort descending by date worked and take last 5
          const sorted = records.sort((a, b) => {
              // Convert dd/mm/yyyy to standard date for comparison
              const [d1, m1, y1] = a.dateWorked.split('/');
              const [d2, m2, y2] = b.dateWorked.split('/');
              return new Date(`${y2}-${m2}-${d2}`).getTime() - new Date(`${y1}-${m1}-${d1}`).getTime();
          });
          this.expandedHistory.set(sorted.slice(0, 5));
          this.isHistoryLoading.set(false);
        },
        error: () => this.isHistoryLoading.set(false)
      });
  }
}