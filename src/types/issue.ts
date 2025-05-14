
export interface IssueData {
  id: string;
  client: string;
  project: string;
  clientPartner: string;
  raisedBy: string;
  description: string;
  resolutionOwner: string;
  escalated: boolean;
  ragStatus: 'Red' | 'Amber' | 'Green';
  dateCreated: string;
  dateResolved: string | null;
  history: IssueHistoryEntry[];
}

export interface IssueHistoryEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

export interface IssueFilterOptions {
  clientPartner?: string;
  escalated?: boolean;
  ragStatus?: string;
}

export interface IssueSummaryStats {
  totalOpen: number;
  escalated: number;
  bySeverity: {
    Red: number;
    Amber: number;
    Green: number;
  };
  byClient: Record<string, number>;
}
