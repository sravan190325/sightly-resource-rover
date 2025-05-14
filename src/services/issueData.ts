
import { IssueData, IssueSummaryStats, IssueFilterOptions } from "../types/issue";
import { v4 as uuidv4 } from 'uuid';

// Dummy data for the issue tracker
export const dummyIssues: IssueData[] = [
  {
    id: uuidv4(),
    client: "AARP",
    project: "Lead Gen - 2025",
    clientPartner: "Komal Singh",
    raisedBy: "John Smith",
    description: "API integration failure with payment gateway",
    resolutionOwner: "Ravi Kumar",
    escalated: true,
    ragStatus: "Red",
    dateCreated: "2025-05-01",
    dateResolved: null,
    history: [
      {
        id: uuidv4(),
        timestamp: "2025-05-01T10:30:00",
        user: "John Smith",
        action: "Created",
        details: "Issue created and assigned to Ravi Kumar"
      },
      {
        id: uuidv4(),
        timestamp: "2025-05-02T14:20:00",
        user: "Ravi Kumar",
        action: "Updated",
        details: "Started investigating payment gateway logs"
      }
    ]
  },
  {
    id: uuidv4(),
    client: "Under Armour",
    project: "Rev Mgmt",
    clientPartner: "Amy Lee",
    raisedBy: "Sarah Johnson",
    description: "Data pipeline failure in production",
    resolutionOwner: "Pranav Sinha",
    escalated: true,
    ragStatus: "Red",
    dateCreated: "2025-05-02",
    dateResolved: null,
    history: [
      {
        id: uuidv4(),
        timestamp: "2025-05-02T09:15:00",
        user: "Sarah Johnson",
        action: "Created",
        details: "Issue created and assigned to Pranav Sinha"
      }
    ]
  },
  {
    id: uuidv4(),
    client: "Comcast",
    project: "Loyalty Platform",
    clientPartner: "Neha Rao",
    raisedBy: "Michael Brown",
    description: "User authentication not working on mobile app",
    resolutionOwner: "Suman Joshi",
    escalated: false,
    ragStatus: "Amber",
    dateCreated: "2025-05-03",
    dateResolved: null,
    history: [
      {
        id: uuidv4(),
        timestamp: "2025-05-03T11:45:00",
        user: "Michael Brown",
        action: "Created",
        details: "Issue created and assigned to Suman Joshi"
      }
    ]
  },
  {
    id: uuidv4(),
    client: "Netflix",
    project: "Streaming Analytics",
    clientPartner: "Karan Patel",
    raisedBy: "Emily Davis",
    description: "Dashboard visualizations not updating",
    resolutionOwner: "Shweta Singh",
    escalated: false,
    ragStatus: "Green",
    dateCreated: "2025-05-04",
    dateResolved: null,
    history: [
      {
        id: uuidv4(),
        timestamp: "2025-05-04T10:00:00",
        user: "Emily Davis",
        action: "Created",
        details: "Issue created and assigned to Shweta Singh"
      }
    ]
  },
  {
    id: uuidv4(),
    client: "Walmart",
    project: "Retail BI",
    clientPartner: "Sana Mir",
    raisedBy: "David Wilson",
    description: "Report generation taking too long",
    resolutionOwner: "Abhishek Rao",
    escalated: true,
    ragStatus: "Amber",
    dateCreated: "2025-05-05",
    dateResolved: null,
    history: [
      {
        id: uuidv4(),
        timestamp: "2025-05-05T14:30:00",
        user: "David Wilson",
        action: "Created",
        details: "Issue created and assigned to Abhishek Rao"
      }
    ]
  },
  {
    id: uuidv4(),
    client: "Diageo",
    project: "Outlet Data",
    clientPartner: "Komal Sharma",
    raisedBy: "Jennifer Taylor",
    description: "Data quality issues in source files",
    resolutionOwner: "Sridhar K",
    escalated: false,
    ragStatus: "Green",
    dateCreated: "2025-05-06",
    dateResolved: null,
    history: [
      {
        id: uuidv4(),
        timestamp: "2025-05-06T09:20:00",
        user: "Jennifer Taylor",
        action: "Created",
        details: "Issue created and assigned to Sridhar K"
      }
    ]
  },
  {
    id: uuidv4(),
    client: "Amazon",
    project: "Prime Insights",
    clientPartner: "Jason Mathew",
    raisedBy: "Robert Anderson",
    description: "ETL job failure",
    resolutionOwner: "Nikita Das",
    escalated: true,
    ragStatus: "Red",
    dateCreated: "2025-05-07",
    dateResolved: null,
    history: [
      {
        id: uuidv4(),
        timestamp: "2025-05-07T11:10:00",
        user: "Robert Anderson",
        action: "Created",
        details: "Issue created and assigned to Nikita Das"
      }
    ]
  },
  {
    id: uuidv4(),
    client: "PepsiCo",
    project: "Sales Data",
    clientPartner: "Ajay Sen",
    raisedBy: "Patricia Martinez",
    description: "API rate limit exceeded",
    resolutionOwner: "Madhavi Iyer",
    escalated: false,
    ragStatus: "Amber",
    dateCreated: "2025-05-08",
    dateResolved: null,
    history: [
      {
        id: uuidv4(),
        timestamp: "2025-05-08T10:45:00",
        user: "Patricia Martinez",
        action: "Created",
        details: "Issue created and assigned to Madhavi Iyer"
      }
    ]
  },
  {
    id: uuidv4(),
    client: "Target",
    project: "Promo Campaign",
    clientPartner: "Vikram Jain",
    raisedBy: "James Johnson",
    description: "Missing data in reports",
    resolutionOwner: "Avni Rao",
    escalated: true,
    ragStatus: "Red",
    dateCreated: "2025-05-09",
    dateResolved: null,
    history: [
      {
        id: uuidv4(),
        timestamp: "2025-05-09T14:00:00",
        user: "James Johnson",
        action: "Created",
        details: "Issue created and assigned to Avni Rao"
      }
    ]
  },
  {
    id: uuidv4(),
    client: "IBM",
    project: "GenAI Pilot",
    clientPartner: "Sonal Gupta",
    raisedBy: "Linda Thomas",
    description: "Model training failure",
    resolutionOwner: "Arjun Rao",
    escalated: true,
    ragStatus: "Amber",
    dateCreated: "2025-05-10",
    dateResolved: null,
    history: [
      {
        id: uuidv4(),
        timestamp: "2025-05-10T09:30:00",
        user: "Linda Thomas",
        action: "Created",
        details: "Issue created and assigned to Arjun Rao"
      }
    ]
  }
];

export function calculateIssueSummaryStats(issues: IssueData[]): IssueSummaryStats {
  // Count open issues (all issues without a resolution date)
  const totalOpen = issues.filter(issue => issue.dateResolved === null).length;
  
  // Count escalated issues
  const escalated = issues.filter(issue => issue.escalated).length;
  
  // Count issues by severity (RAG status)
  const bySeverity = {
    Red: issues.filter(issue => issue.ragStatus === 'Red').length,
    Amber: issues.filter(issue => issue.ragStatus === 'Amber').length,
    Green: issues.filter(issue => issue.ragStatus === 'Green').length,
  };
  
  // Count issues by client
  const byClient: Record<string, number> = {};
  issues.forEach(issue => {
    if (byClient[issue.client]) {
      byClient[issue.client]++;
    } else {
      byClient[issue.client] = 1;
    }
  });
  
  return {
    totalOpen,
    escalated,
    bySeverity,
    byClient
  };
}

export function getRAGStatusClass(status: string): string {
  switch (status) {
    case 'Red': return 'bg-red-100 text-red-800 border-red-200';
    case 'Amber': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Green': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getUniqueClientPartners(): string[] {
  return Array.from(new Set(dummyIssues.map(item => item.clientPartner)));
}

export function filterIssues(issues: IssueData[], filters: IssueFilterOptions): IssueData[] {
  return issues.filter(issue => {
    const matchesClientPartner = !filters.clientPartner || issue.clientPartner === filters.clientPartner;
    const matchesEscalated = filters.escalated === undefined || issue.escalated === filters.escalated;
    const matchesRAG = !filters.ragStatus || issue.ragStatus === filters.ragStatus;
    
    return matchesClientPartner && matchesEscalated && matchesRAG;
  });
}

// Generate trend data for the past 30 days
export function generateTrendData() {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Generate some random numbers for open and resolved issues
    const openIssues = Math.floor(Math.random() * 10) + 15; // Between 15-25
    const resolvedIssues = Math.floor(Math.random() * 8) + 5; // Between 5-12
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: openIssues,
      resolved: resolvedIssues
    });
  }
  
  return data;
}

export const trendData = generateTrendData();
