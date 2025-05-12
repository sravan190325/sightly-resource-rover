
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ResourceData } from '@/types/resource';
import { formatCurrency, getPerformanceClass, getBudgetClass } from '@/services/resourceData';

interface ResourceTableProps {
  data: ResourceData[];
}

const ResourceTable: React.FC<ResourceTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Client Partner</TableHead>
            <TableHead>Delivery Lead</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead>Service Line</TableHead>
            <TableHead>Booking (%)</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead>Contract</TableHead>
            <TableHead>Total Budget</TableHead>
            <TableHead>Burned Budget</TableHead>
            <TableHead>Remaining Budget</TableHead>
            <TableHead>Burn Rate (%)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow 
                key={row.id} 
                className={`${getPerformanceClass(row.performance)} ${getBudgetClass(row.burnRate)}`}
              >
                <TableCell>{row.client}</TableCell>
                <TableCell>{row.project}</TableCell>
                <TableCell>{row.clientPartner}</TableCell>
                <TableCell>{row.deliveryLead}</TableCell>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.resource}</TableCell>
                <TableCell>{row.serviceLine}</TableCell>
                <TableCell>{row.booking * 100}%</TableCell>
                <TableCell>{row.performance}</TableCell>
                <TableCell>{row.isContract ? 'Yes' : 'No'}</TableCell>
                <TableCell>{formatCurrency(row.totalBudget)}</TableCell>
                <TableCell>{formatCurrency(row.burnedBudget)}</TableCell>
                <TableCell>{formatCurrency(row.remainingBudget)}</TableCell>
                <TableCell>{row.burnRate}%</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={15} className="h-24 text-center">
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResourceTable;
