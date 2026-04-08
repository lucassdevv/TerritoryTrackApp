export interface S13Assignment {
  publisherName: string;
  dateAssigned: string;
  dateCompleted: string | null;
}

export interface S13Row {
  territoryNumber: number;
  lastCompletedDate: string | null;
  assignments: S13Assignment[];
}

export interface S13Report {
  serviceYear: number;
  serviceYearLabel: string;
  rows: S13Row[];
}
