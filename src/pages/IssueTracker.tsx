
import React, { useState, useMemo } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Plus, Mail } from 'lucide-react';
import IssueFilterBar from '@/components/IssueFilterBar';
import IssueSummaryBoxes from '@/components/IssueSummaryBoxes';
import IssueTable from '@/components/IssueTable';
import IssueCharts from '@/components/IssueCharts';
import AddEditIssueDialog from '@/components/AddEditIssueDialog';
import { filterIssues } from '@/services/issueData';
import { IssueData } from '@/types/issue';
import { dummyIssues } from '@/services/issueData';
import html2canvas from 'html2canvas';

const IssueTracker = () => {
  const [clientPartnerFilter, setClientPartnerFilter] = useState<string>("All");
  const [escalatedFilter, setEscalatedFilter] = useState<string>("All");
  const [ragStatusFilter, setRagStatusFilter] = useState<string>("All");
  const [issues, setIssues] = useState<IssueData[]>(dummyIssues);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<IssueData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const dashboardRef = React.useRef<HTMLDivElement>(null);

  const filteredIssues = useMemo(() => {
    return filterIssues(issues, {
      clientPartner: clientPartnerFilter === "All" ? undefined : clientPartnerFilter,
      escalated: escalatedFilter === "All" ? undefined : escalatedFilter === "Yes",
      ragStatus: ragStatusFilter === "All" ? undefined : ragStatusFilter,
    });
  }, [issues, clientPartnerFilter, escalatedFilter, ragStatusFilter]);

  const handleFilterChange = (clientPartner: string, escalated: string, ragStatus: string) => {
    setClientPartnerFilter(clientPartner);
    setEscalatedFilter(escalated);
    setRagStatusFilter(ragStatus);
    
    toast({
      title: "Filters Applied",
      description: `Showing ${escalated !== "All" ? `${escalated} escalated` : "all"} ${ragStatus !== "All" ? `${ragStatus}` : ""} issues${clientPartner !== "All" ? ` for ${clientPartner}` : ""}`,
    });
  };

  const handleAddIssue = (newIssue: IssueData) => {
    setIssues(prev => [...prev, newIssue]);
    toast({
      title: "Issue Added",
      description: "New issue has been successfully added.",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditIssue = (updatedIssue: IssueData) => {
    setIssues(prev => 
      prev.map(issue => issue.id === updatedIssue.id ? updatedIssue : issue)
    );
    toast({
      title: "Issue Updated",
      description: "Issue has been successfully updated.",
    });
    setEditingIssue(null);
  };

  const handleDownload = async () => {
    if (!dashboardRef.current) return;
    
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `issue-tracker-dashboard-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = image;
      link.click();
      
      toast({
        title: 'Success',
        description: 'Dashboard downloaded as image',
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: 'Error',
        description: 'Failed to download dashboard image',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSendAlerts = () => {
    const escalatedIssues = issues.filter(issue => issue.escalated);
    if (escalatedIssues.length === 0) {
      toast({
        title: "No Escalated Issues",
        description: "There are no escalated issues to send alerts for.",
      });
      return;
    }
    
    toast({
      title: "Alerts Sent",
      description: `Email alerts sent for ${escalatedIssues.length} escalated issues.`,
    });
  };

  const openEditDialog = (issue: IssueData) => {
    setEditingIssue(issue);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 p-6 rounded-lg bg-gradient-to-r from-[#F2FCE2] to-[#D3E4FD]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Issue Tracker Dashboard</h1>
            <p className="text-muted-foreground">Monitor, manage, and resolve project issues</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsAddDialogOpen(true)} 
              className="bg-primary text-white hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Issue
            </Button>
            <Button 
              onClick={handleSendAlerts} 
              className="bg-[#E5DEFF] text-primary border border-primary hover:bg-primary hover:text-white"
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Alerts
            </Button>
            <Button 
              onClick={handleDownload} 
              disabled={isDownloading}
              className="bg-white text-primary border border-primary hover:bg-primary hover:text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? 'Downloading...' : 'Export'}
            </Button>
          </div>
        </div>
      </header>

      <div ref={dashboardRef}>
        {/* Filter Section */}
        <div className="mb-8 p-4 rounded-lg bg-[#F1F0FB] shadow-sm">
          <IssueFilterBar onFilterChange={handleFilterChange} />
        </div>

        {/* Summary Boxes Section */}
        <div className="mb-6">
          <IssueSummaryBoxes issues={issues} />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="issues" className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="issues">Issue Log</TabsTrigger>
            <TabsTrigger value="charts">Trend Charts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="issues">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredIssues.length} issues
              {clientPartnerFilter !== "All" && ` for ${clientPartnerFilter}`}
              {escalatedFilter !== "All" && ` that are ${escalatedFilter === "Yes" ? "escalated" : "not escalated"}`}
              {ragStatusFilter !== "All" && ` with ${ragStatusFilter} status`}
            </div>
            
            <IssueTable 
              data={filteredIssues} 
              onEditIssue={openEditDialog}
            />
          </TabsContent>
          
          <TabsContent value="charts">
            <IssueCharts issues={issues} />
          </TabsContent>
        </Tabs>
      </div>

      <AddEditIssueDialog 
        open={isAddDialogOpen || editingIssue !== null} 
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setEditingIssue(null);
          }
        }}
        issue={editingIssue}
        onSubmit={editingIssue ? handleEditIssue : handleAddIssue}
      />
    </div>
  );
};

export default IssueTracker;
