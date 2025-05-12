
import React, { useState, useMemo } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FilterBar from '@/components/FilterBar';
import SummaryBoxes from '@/components/SummaryBoxes';
import ResourceTable from '@/components/ResourceTable';
import ChartSection from '@/components/ChartSection';
import { resourceData, calculateSummaryStats } from '@/services/resourceData';
import { ResourceData } from '@/types/resource';
import InfoCard from '@/components/InfoCard';

const Index = () => {
  const [clientPartnerFilter, setClientPartnerFilter] = useState<string>("All");
  const [endDateFilter, setEndDateFilter] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return resourceData.filter(item => {
      const matchesClientPartner = clientPartnerFilter === "All" || item.clientPartner === clientPartnerFilter;
      const matchesEndDate = !endDateFilter || new Date(item.endDate) <= new Date(endDateFilter);
      return matchesClientPartner && matchesEndDate;
    });
  }, [clientPartnerFilter, endDateFilter]);

  const summaryStats = useMemo(() => {
    return calculateSummaryStats(filteredData);
  }, [filteredData]);

  const handleFilterChange = (clientPartner: string, endDate: string | null) => {
    setClientPartnerFilter(clientPartner);
    setEndDateFilter(endDate);
    
    toast({
      title: 'Filters Applied',
      description: `Showing data for ${clientPartner === 'All' ? 'all client partners' : clientPartner}${endDate ? ` ending before ${endDate}` : ''}`,
    });
  };

  const highlightedData = useMemo(() => {
    const contractResources = filteredData.filter(item => item.isContract);
    const highPerformers = filteredData.filter(item => item.performance === 'A1');
    const lowUtilization = filteredData.filter(item => item.booking < 0.7);
    const highBurnRate = filteredData.filter(item => item.burnRate > 70);
    
    return {
      contractResources,
      highPerformers,
      lowUtilization,
      highBurnRate
    };
  }, [filteredData]);

  const getAverageBurnRate = (data: ResourceData[]): string => {
    if (data.length === 0) return '0%';
    const avg = data.reduce((sum, item) => sum + item.burnRate, 0) / data.length;
    return `${Math.round(avg)}%`;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 p-6 rounded-lg bg-gradient-to-r from-[#F2FCE2] to-[#D3E4FD]">
        <h1 className="text-3xl font-bold mb-2">Resource Utilization Dashboard</h1>
        <p className="text-muted-foreground">Monitor your team's utilization, performance, and budget allocation</p>
      </header>

      {/* Filter Section */}
      <div className="mb-8 p-4 rounded-lg bg-[#F1F0FB] shadow-sm">
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <InfoCard 
          title="Avg Booking" 
          value={`${Math.round(summaryStats.avgBooking * 100)}%`}
          type="info"
          description="Average resource booking percentage"
          className="bg-[#D3E4FD] border-[#D3E4FD]"
        />
        <InfoCard 
          title="Contract Resources" 
          value={summaryStats.contractCount}
          type="users"
          description={`${Math.round((summaryStats.contractCount / filteredData.length) * 100)}% of total`}
          className="bg-[#E5DEFF] border-[#E5DEFF]"
        />
        <InfoCard 
          title="Average Burn Rate" 
          value={getAverageBurnRate(filteredData)}
          type="money"
          description="Across all projects"
          className="bg-[#FFDEE2] border-[#FFDEE2]"
        />
        <InfoCard 
          title="Low Utilization" 
          value={highlightedData.lowUtilization.length}
          type="warning"
          description="Resources below 70% booking"
          className="bg-[#FDE1D3] border-[#FDE1D3]"
        />
      </div>

      {/* Summary Boxes with pastel colors */}
      <div className="mb-6 p-4 rounded-lg bg-[#FEF7CD] shadow-sm">
        <SummaryBoxes stats={summaryStats} />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="table" className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="table">
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredData.length} resources
            {clientPartnerFilter !== "All" && ` for ${clientPartnerFilter}`}
            {endDateFilter && ` ending before ${endDateFilter}`}
          </div>
          <ResourceTable data={filteredData} />
        </TabsContent>
        
        <TabsContent value="charts">
          <ChartSection data={filteredData} />
        </TabsContent>
      </Tabs>

      {/* Legend */}
      <div className="mt-8 bg-white p-4 rounded-md border shadow-sm">
        <h3 className="font-semibold mb-2">Legend</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Performance Indicators</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-rag-green mr-2"></div>
                <span className="text-sm">A1 - High Performance</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-rag-amber mr-2"></div>
                <span className="text-sm">A2 - Medium Performance</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-rag-red mr-2"></div>
                <span className="text-sm">A3 - Low Performance</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Budget Categories</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-budget-high mr-2"></div>
                <span className="text-sm">High Burn Rate (&gt;60%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-budget-medium mr-2"></div>
                <span className="text-sm">Medium Burn Rate (40-60%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-budget-low mr-2"></div>
                <span className="text-sm">Low Burn Rate (&lt;40%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
