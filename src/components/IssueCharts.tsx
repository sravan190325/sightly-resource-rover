
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { IssueData } from '@/types/issue';
import { calculateIssueSummaryStats, trendData } from '@/services/issueData';

interface IssueChartsProps {
  issues: IssueData[];
}

const IssueCharts: React.FC<IssueChartsProps> = ({ issues }) => {
  const stats = calculateIssueSummaryStats(issues);
  
  // Prepare data for the severity bar chart
  const severityData = [
    { name: 'Red', value: stats.bySeverity.Red, color: '#fee2e2' },
    { name: 'Amber', value: stats.bySeverity.Amber, color: '#fef9c3' },
    { name: 'Green', value: stats.bySeverity.Green, color: '#dcfce7' },
  ];

  // Prepare data for the client bar chart
  const clientData = Object.entries(stats.byClient).map(([name, value], index) => ({
    name,
    value,
    color: [
      '#dbeafe', '#e5e7eb', '#fcdcdc', '#fed7aa', 
      '#d1fae5', '#fef3c7', '#e5deff', '#fee2e2'
    ][index % 8]
  }));

  return (
    <div className="space-y-8">
      <div className="p-4 bg-white rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Open vs. Resolved Issues (Last 30 Days)</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis />
              <Tooltip labelFormatter={(label) => `Date: ${label}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="open"
                stroke="#8884d8"
                name="Open Issues"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="#82ca9d"
                name="Resolved Issues"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Issues by Severity</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={severityData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} issues`, 'Count']} />
                <Bar dataKey="value" name="Count">
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Issues by Client</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={clientData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  width={100}
                  tick={{
                    fontSize: 12
                  }}
                />
                <Tooltip formatter={(value) => [`${value} issues`, 'Count']} />
                <Bar dataKey="value" name="Count">
                  {clientData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCharts;
