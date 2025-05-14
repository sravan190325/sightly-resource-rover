
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { IssueHistoryEntry } from '@/types/issue';
import { format } from 'date-fns';

interface IssueHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  history: IssueHistoryEntry[];
  issueName: string;
}

const IssueHistoryDialog: React.FC<IssueHistoryDialogProps> = ({
  open,
  onOpenChange,
  history,
  issueName,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Issue History</DialogTitle>
          <DialogDescription>
            Tracking history for issue on {issueName}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {history.map((entry) => {
            // Format the timestamp for display
            const timestamp = new Date(entry.timestamp);
            const formattedDate = format(timestamp, 'MMM dd, yyyy');
            const formattedTime = format(timestamp, 'HH:mm');
            
            return (
              <div 
                key={entry.id} 
                className="border-l-2 border-primary pl-4 py-2"
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium">{entry.action}</span>
                  <div className="text-xs text-muted-foreground">
                    <div>{formattedDate}</div>
                    <div>{formattedTime}</div>
                  </div>
                </div>
                <div className="text-sm mt-1">{entry.details}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  By: {entry.user}
                </div>
              </div>
            );
          })}
          
          {history.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No history entries found for this issue.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IssueHistoryDialog;
