
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { GroupedResources, ResourceData } from '@/types/resource';
import { formatCurrency, getBudgetClass } from '@/services/resourceData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronRight, Users, Layers } from 'lucide-react';

interface GroupedResourceTableProps {
  data: GroupedResources[];
}

const GroupedResourceTable: React.FC<GroupedResourceTableProps> = ({ data }) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  return (
    <div className="space-y-6">
      {data.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p>No resources found with the current filters.</p>
          </CardContent>
        </Card>
      ) : (
        data.map((group) => {
          const groupKey = `${group.client}-${group.project}`;
          const isExpanded = !!expandedGroups[groupKey];
          
          return (
            <Card key={groupKey} className="overflow-hidden">
              <CardHeader 
                className="bg-[#F1F0FB] p-4 cursor-pointer hover:bg-[#E5DEFF]"
                onClick={() => toggleGroup(groupKey)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isExpanded ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                    <Layers className="h-5 w-5 mr-2" />
                    <CardTitle className="text-lg">
                      {group.client} - {group.project}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{group.metrics.resourceCount} resources</span>
                    </div>
                    <div className={`px-2 py-1 rounded-md ${getBudgetClass(group.metrics.avgBurnRate)}`}>
                      Burn Rate: {group.metrics.avgBurnRate}%
                    </div>
                    <div className="font-medium">
                      Budget: {formatCurrency(group.metrics.totalBudget)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead>Resource</TableHead>
                        <TableHead>Service Line</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Booking (%)</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Burn Rate (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.resources.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell className="font-medium">{resource.resource}</TableCell>
                          <TableCell>{resource.serviceLine}</TableCell>
                          <TableCell>{resource.region}</TableCell>
                          <TableCell>{resource.startDate}</TableCell>
                          <TableCell>{resource.endDate}</TableCell>
                          <TableCell>{resource.booking * 100}%</TableCell>
                          <TableCell>{resource.performance}</TableCell>
                          <TableCell>{formatCurrency(resource.totalBudget)}</TableCell>
                          <TableCell>{resource.burnRate}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              )}
            </Card>
          );
        })
      )}
    </div>
  );
};

export default GroupedResourceTable;
