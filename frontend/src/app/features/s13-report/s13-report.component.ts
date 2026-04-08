import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerritoryRecordService } from '../../core/services/territory-record.service';
import { S13Report, S13Row, S13Assignment } from '../../core/models/s13-report.model';

@Component({
  selector: 'app-s13-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './s13-report.component.html',
  styleUrl: './s13-report.component.css',
})
export class S13ReportComponent implements OnInit {
  private territoryRecordService = inject(TerritoryRecordService);

  report = signal<S13Report | null>(null);
  isLoading = signal(true);
  errorMessage = signal<string | null>(null);

  // We chunk the flat rows into pages of ~22 rows for the print layout
  pages = signal<S13Row[][]>([]);

  private readonly ROWS_PER_PAGE = 22;

  ngOnInit() {
    this.fetchReport();
  }

  fetchReport(serviceYear?: number) {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.territoryRecordService.getS13Report(serviceYear).subscribe({
      next: (data) => {
        this.report.set(data);
        this.paginateRows(data.rows);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching S-13 report', err);
        this.errorMessage.set('Error al cargar el reporte S-13.');
        this.isLoading.set(false);
      },
    });
  }

  private paginateRows(rows: S13Row[]) {
    const pages: S13Row[][] = [];
    for (let i = 0; i < rows.length; i += this.ROWS_PER_PAGE) {
      pages.push(rows.slice(i, i + this.ROWS_PER_PAGE));
    }
    // Ensure at least one page
    if (pages.length === 0) {
      pages.push([]);
    }
    this.pages.set(pages);
  }

  printReport() {
    window.print();
  }

  /**
   * Helper to pad the assignments array to exactly 4 slots
   * so the table always renders 4 columns.
   */
  padAssignments(row: S13Row): (S13Assignment | null)[] {
    const padded: (S13Assignment | null)[] = [...row.assignments];
    while (padded.length < 4) {
      padded.push(null);
    }
    return padded;
  }

  getEmptyRows(pageLength: number): number[] {
    const count = Math.max(0, this.ROWS_PER_PAGE - pageLength);
    return Array.from({ length: count }, (_, i) => i);
  }
}
