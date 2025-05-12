
export interface ResourceData {
  id: string;
  client: string;
  project: string;
  clientPartner: string;
  deliveryLead: string;
  startDate: string;
  endDate: string;
  resource: string;
  serviceLine: 'DE' | 'BI' | 'DS';
  booking: number;
  performance: 'A1' | 'A2' | 'A3';
  isContract: boolean;
  totalBudget: number;
  burnedBudget: number;
  remainingBudget: number;
  burnRate: number;
}

export interface SummaryStats {
  avgBooking: number;
  teamDistribution: {
    DE: number;
    BI: number;
    DS: number;
  };
  contractCount: number;
}
