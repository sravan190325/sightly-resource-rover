
import React from 'react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { IssueData } from '@/types/issue';
import { calculateIssueSummaryStats } from '@/services/issueData';
import InfoCard from '@/components/InfoCard';

interface IssueSummaryBoxesProps {
  issues: IssueData[];
}

const IssueSummaryBoxes: React.FC<IssueSummaryBoxesProps> = ({ issues }) => {
  const stats = calculateIssueSummaryStats(issues);

  // Prepare data for the severity bar chart
  const severityData = [
    { name: 'Red', value: stats.bySeverity.Red, color: '#fee2e2' },
    { name: 'Amber', value: stats.bySeverity.Amber, color: '#fef9c3' },
    { name: 'Green', value: stats.bySeverity.Green, color: '#dcfce7' },
  ];

  // Prepare data for the client pie chart
  const clientData = Object.entries(stats.byClient).map(([name, value], index) => ({
    name,
    value,
    color: [
      '#dbeafe', '#e5e7eb', '#fcdcdc', '#fed7aa', 
      '#d1fae5', '#fef3c7', '#e5deff', '#fee2e2'
    ][index % 8]
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <InfoCard 
        title="Total Open Issues" 
        value={stats.totalOpen.toString()}
        type="info"
        description="Current unresolved issues"
        className="bg-[#D3E4FD] border-[#D3E4FD]"
      />
      
      <InfoCard 
        title="Escalated Issues" 
        value={stats.escalated.toString()}
        type="warning"
        description="Issues requiring attention"
        className="bg-[#FFDEE2] border-[#FFDEE2]"
      />
      
      <div className="bg-[#FEF7CD] p-4 rounded-lg shadow-sm flex flex-col h-full">
        <h3 className="font-medium mb-1">Issues by Severity</h3>
        <div className="flex-1 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={severityData}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            >
              <Tooltip
                formatter={(value) => [`${value} issues`, 'Count']}
              />
              <Bar 
                dataKey="value" 
                fill="#8884d8"
                radius={[0, 4, 4, 0]}
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-around mt-1 text-xs">
          {severityData.map((item) => (
            <div key={item.name} className="flex items-center">
              <div 
                className="w-3 h-3 mr-1 rounded-sm" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span>{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-[#E5DEFF] p-4 rounded-lg shadow-sm flex flex-col h-full">
        <h3 className="font-medium mb-1">Issues by Client</h3>
        <div className="flex-1 h-24">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={clientData}
                cx="50%"
                cy="50%"
                outerRadius={40}
                dataKey="value"
                label={false}
              >
                {clientData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [`${value} issues`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs mt-1 grid grid-cols-2 gap-1">
          {clientData.slice(0, 4).map((item) => (
            <div key={item.name} className="flex items-center overflow-hidden">
              <div 
                className="w-3 h-3 min-w-[0.75rem] mr-1 rounded-sm" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="truncate" title={`${item.name}: ${item.value}`}>
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IssueSummaryBoxes;
