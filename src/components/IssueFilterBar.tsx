
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getUniqueClientPartners } from '@/services/issueData';

interface IssueFilterBarProps {
  onFilterChange: (clientPartner: string, escalated: string, ragStatus: string) => void;
}

const IssueFilterBar: React.FC<IssueFilterBarProps> = ({ onFilterChange }) => {
  const [clientPartner, setClientPartner] = useState<string>("All");
  const [escalated, setEscalated] = useState<string>("All");
  const [ragStatus, setRagStatus] = useState<string>("All");

  const clientPartners = ['All', ...getUniqueClientPartners()];
  const escalatedOptions = ['All', 'Yes', 'No'];
  const ragStatusOptions = ['All', 'Red', 'Amber', 'Green'];

  const handleApplyFilters = () => {
    onFilterChange(clientPartner, escalated, ragStatus);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end mb-6">
      <div className="w-full sm:w-auto">
        <Label htmlFor="clientPartnerFilter" className="mb-2 block">Client Partner</Label>
        <Select value={clientPartner} onValueChange={setClientPartner}>
          <SelectTrigger className="w-full sm:w-60">
            <SelectValue placeholder="Select client partner" />
          </SelectTrigger>
          <SelectContent>
            {clientPartners.map((cp) => (
              <SelectItem key={cp} value={cp}>
                {cp}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-auto">
        <Label htmlFor="escalatedFilter" className="mb-2 block">Escalated</Label>
        <Select value={escalated} onValueChange={setEscalated}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Escalated?" />
          </SelectTrigger>
          <SelectContent>
            {escalatedOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-auto">
        <Label htmlFor="ragStatusFilter" className="mb-2 block">RAG Status</Label>
        <Select value={ragStatus} onValueChange={setRagStatus}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {ragStatusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleApplyFilters} className="mt-2 sm:mt-0">
        Apply Filters
      </Button>
    </div>
  );
};

export default IssueFilterBar;
