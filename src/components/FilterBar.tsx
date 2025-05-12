
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getUniqueClientPartners } from '@/services/resourceData';

interface FilterBarProps {
  onFilterChange: (clientPartner: string, endDate: string | null, region: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [clientPartner, setClientPartner] = useState<string>("All");
  const [endDate, setEndDate] = useState<string>("");
  const [region, setRegion] = useState<string>("All");

  const clientPartners = ['All', ...getUniqueClientPartners()];
  const regions = ['All', 'IDC', 'US', 'EMEA', 'LATAM'];

  const handleApplyFilters = () => {
    onFilterChange(
      clientPartner,
      endDate ? endDate : null,
      region
    );
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
        <Label htmlFor="endDateFilter" className="mb-2 block">Project End Date</Label>
        <input
          type="date"
          id="endDateFilter"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="w-full sm:w-auto">
        <Label htmlFor="regionFilter" className="mb-2 block">Region</Label>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="w-full sm:w-60">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
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

export default FilterBar;
