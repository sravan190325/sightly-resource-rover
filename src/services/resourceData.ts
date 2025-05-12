import { ResourceData, SummaryStats, GroupedResources } from "../types/resource";
import { v4 as uuidv4 } from 'uuid';

export const resourceData: ResourceData[] = [
  {
    id: uuidv4(),
    client: "AARP",
    project: "Lead Gen - 2025",
    clientPartner: "Komal Singh",
    deliveryLead: "Ravi Kumar",
    startDate: "2025-01-01",
    endDate: "2025-06-30",
    resource: "SYED JAVEED",
    serviceLine: "BI",
    booking: 1.0,
    performance: "A1",
    isContract: false,
    totalBudget: 100000,
    burnedBudget: 64109,
    remainingBudget: 35891,
    burnRate: 64
  },
  {
    id: uuidv4(),
    client: "Under Armour",
    project: "Rev Mgmt",
    clientPartner: "Amy Lee",
    deliveryLead: "Pranav Sinha",
    startDate: "2025-01-10",
    endDate: "2025-06-15",
    resource: "RAM KUMAR",
    serviceLine: "DE",
    booking: 0.8,
    performance: "A2",
    isContract: true,
    totalBudget: 120000,
    burnedBudget: 73232,
    remainingBudget: 46768,
    burnRate: 61
  },
  {
    id: uuidv4(),
    client: "Comcast",
    project: "Loyalty Platform",
    clientPartner: "Neha Rao",
    deliveryLead: "Suman Joshi",
    startDate: "2025-02-01",
    endDate: "2025-07-31",
    resource: "LOKESH ATMURI",
    serviceLine: "DS",
    booking: 0.6,
    performance: "A3",
    isContract: false,
    totalBudget: 75000,
    burnedBudget: 28500,
    remainingBudget: 46500,
    burnRate: 38
  },
  {
    id: uuidv4(),
    client: "Netflix",
    project: "Streaming Analytics",
    clientPartner: "Karan Patel",
    deliveryLead: "Shweta Singh",
    startDate: "2025-03-01",
    endDate: "2025-09-30",
    resource: "VIKAS MEHTA",
    serviceLine: "DS",
    booking: 0.9,
    performance: "A1",
    isContract: false,
    totalBudget: 110000,
    burnedBudget: 66688,
    remainingBudget: 43312,
    burnRate: 61
  },
  {
    id: uuidv4(),
    client: "Walmart",
    project: "Retail BI",
    clientPartner: "Sana Mir",
    deliveryLead: "Abhishek Rao",
    startDate: "2025-02-15",
    endDate: "2025-06-15",
    resource: "PRIYA REDDY",
    serviceLine: "BI",
    booking: 0.7,
    performance: "A2",
    isContract: true,
    totalBudget: 95000,
    burnedBudget: 48780,
    remainingBudget: 46220,
    burnRate: 51
  },
  {
    id: uuidv4(),
    client: "Diageo",
    project: "Outlet Data",
    clientPartner: "Komal Sharma",
    deliveryLead: "Sridhar K",
    startDate: "2025-01-20",
    endDate: "2025-05-20",
    resource: "RAHUL N",
    serviceLine: "DE",
    booking: 0.5,
    performance: "A3",
    isContract: false,
    totalBudget: 87000,
    burnedBudget: 33790,
    remainingBudget: 53210,
    burnRate: 39
  },
  {
    id: uuidv4(),
    client: "Amazon",
    project: "Prime Insights",
    clientPartner: "Jason Mathew",
    deliveryLead: "Nikita Das",
    startDate: "2025-04-01",
    endDate: "2025-12-01",
    resource: "ANKUR VERMA",
    serviceLine: "DS",
    booking: 1.0,
    performance: "A1",
    isContract: true,
    totalBudget: 200000,
    burnedBudget: 86438,
    remainingBudget: 113562,
    burnRate: 43
  },
  {
    id: uuidv4(),
    client: "PepsiCo",
    project: "Sales Data",
    clientPartner: "Ajay Sen",
    deliveryLead: "Madhavi Iyer",
    startDate: "2025-01-10",
    endDate: "2025-03-30",
    resource: "NIRANJAN T",
    serviceLine: "BI",
    booking: 0.4,
    performance: "A3",
    isContract: false,
    totalBudget: 60000,
    burnedBudget: 48600,
    remainingBudget: 11400,
    burnRate: 81
  },
  {
    id: uuidv4(),
    client: "Target",
    project: "Promo Campaign",
    clientPartner: "Vikram Jain",
    deliveryLead: "Avni Rao",
    startDate: "2025-05-01",
    endDate: "2025-12-31",
    resource: "KAVYA M",
    serviceLine: "DE",
    booking: 1.0,
    performance: "A1",
    isContract: true,
    totalBudget: 150000,
    burnedBudget: 35562,
    remainingBudget: 114438,
    burnRate: 24
  },
  {
    id: uuidv4(),
    client: "IBM",
    project: "GenAI Pilot",
    clientPartner: "Sonal Gupta",
    deliveryLead: "Arjun Rao",
    startDate: "2025-02-01",
    endDate: "2025-08-31",
    resource: "MEENAKSHI A",
    serviceLine: "DS",
    booking: 0.85,
    performance: "A2",
    isContract: false,
    totalBudget: 105000,
    burnedBudget: 55890,
    remainingBudget: 49110,
    burnRate: 53
  }
];

export function calculateSummaryStats(data: ResourceData[]): SummaryStats {
  if (data.length === 0) {
    return {
      avgBooking: 0,
      teamDistribution: { DE: 0, BI: 0, DS: 0 },
      contractCount: 0
    };
  }

  // Calculate average booking
  const totalBooking = data.reduce((sum, item) => sum + item.booking, 0);
  const avgBooking = totalBooking / data.length;

  // Calculate team distribution
  const teamDistribution = {
    DE: data.filter(item => item.serviceLine === 'DE').length,
    BI: data.filter(item => item.serviceLine === 'BI').length,
    DS: data.filter(item => item.serviceLine === 'DS').length
  };

  // Count contract resources
  const contractCount = data.filter(item => item.isContract).length;

  return {
    avgBooking,
    teamDistribution,
    contractCount
  };
}

export function getPerformanceClass(performance: string): string {
  switch (performance) {
    case 'A1': return 'rag-green';
    case 'A2': return 'rag-amber';
    case 'A3': return 'rag-red';
    default: return '';
  }
}

export function getBudgetClass(burnRate: number): string {
  if (burnRate > 60) return 'budget-high';
  if (burnRate >= 40) return 'budget-medium';
  return 'budget-low';
}

export function getUniqueClientPartners(): string[] {
  return Array.from(new Set(resourceData.map(item => item.clientPartner)));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// New function to group resources by project
export function groupResourcesByProject(data: ResourceData[]): GroupedResources[] {
  const groupedMap = new Map<string, ResourceData[]>();
  
  // Group resources by project
  data.forEach(resource => {
    const key = `${resource.client}-${resource.project}`;
    if (!groupedMap.has(key)) {
      groupedMap.set(key, []);
    }
    groupedMap.get(key)!.push(resource);
  });
  
  // Convert map to array structure
  const result: GroupedResources[] = Array.from(groupedMap.entries()).map(([key, resources]) => {
    const [client, project] = key.split('-');
    const totalBudget = resources.reduce((sum, r) => sum + r.totalBudget, 0);
    const burnedBudget = resources.reduce((sum, r) => sum + r.burnedBudget, 0);
    const remainingBudget = resources.reduce((sum, r) => sum + r.remainingBudget, 0);
    const avgBurnRate = resources.length > 0
      ? Math.round(resources.reduce((sum, r) => sum + r.burnRate, 0) / resources.length)
      : 0;
    
    return {
      client,
      project,
      resources,
      metrics: {
        totalBudget,
        burnedBudget,
        remainingBudget,
        avgBurnRate,
        resourceCount: resources.length
      }
    };
  });
  
  // Sort by client and project
  return result.sort((a, b) => {
    return a.client === b.client ? a.project.localeCompare(b.project) : a.client.localeCompare(b.client);
  });
}
