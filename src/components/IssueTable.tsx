
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Edit, FileText } from 'lucide-react';
import { IssueData, IssueHistoryEntry } from '@/types/issue';
import { getRAGStatusClass } from '@/services/issueData';
import IssueHistoryDialog from './IssueHistoryDialog';

interface IssueTableProps {
  data: IssueData[];
  onEditIssue: (issue: IssueData) => void;
}

const IssueTable: React.FC<IssueTableProps> = ({ data, onEditIssue }) => {
  const [viewingHistory, setViewingHistory] = useState<IssueHistoryEntry[] | null>(null);
  const [historyIssue, setHistoryIssue] = useState<string | null>(null);

  const handleViewHistory = (issue: IssueData) => {
    setViewingHistory(issue.history);
    setHistoryIssue(issue.project);
  };

  return (
    <>
      <div className="w-full overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Client Partner</TableHead>
              <TableHead>Raised By</TableHead>
              <TableHead className="max-w-[250px]">Description</TableHead>
              <TableHead>Resolution Owner</TableHead>
              <TableHead>Escalated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>History</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>{issue.client}</TableCell>
                  <TableCell>{issue.project}</TableCell>
                  <TableCell>{issue.clientPartner}</TableCell>
                  <TableCell>{issue.raisedBy}</TableCell>
                  <TableCell className="max-w-[250px]">
                    <div className="truncate" title={issue.description}>
                      {issue.description}
                    </div>
                  </TableCell>
                  <TableCell>{issue.resolutionOwner}</TableCell>
                  <TableCell>{issue.escalated ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Badge className={`${getRAGStatusClass(issue.ragStatus)}`}>
                      {issue.ragStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewHistory(issue)}
                      title="View Issue History"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onEditIssue(issue)}
                      title="Edit Issue"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  No issues found matching the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <IssueHistoryDialog
        open={!!viewingHistory}
        onOpenChange={(open) => {
          if (!open) {
            setViewingHistory(null);
            setHistoryIssue(null);
          }
        }}
        history={viewingHistory || []}
        issueName={historyIssue || ''}
      />
    </>
  );
};

export default IssueTable;
