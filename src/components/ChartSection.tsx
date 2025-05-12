
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResourceData } from '@/types/resource';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface ChartSectionProps {
  data: ResourceData[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ data }) => {
  const serviceLineData = useMemo(() => {
    const counts = { DE: 0, BI: 0, DS: 0 };
    data.forEach((item) => {
      counts[item.serviceLine]++;
    });

    return [
      { name: 'DE', value: counts.DE },
      { name: 'BI', value: counts.BI },
      { name: 'DS', value: counts.DS },
    ];
  }, [data]);

  const performanceData = useMemo(() => {
    const counts = { A1: 0, A2: 0, A3: 0 };
    data.forEach((item) => {
      counts[item.performance]++;
    });

    return [
      { name: 'A1', value: counts.A1 },
      { name: 'A2', value: counts.A2 },
      { name: 'A3', value: counts.A3 },
    ];
  }, [data]);

  const budgetByClient = useMemo(() => {
    const clientBudget = new Map();
    data.forEach((item) => {
      if (!clientBudget.has(item.client)) {
        clientBudget.set(item.client, {
          total: 0,
          burned: 0,
          remaining: 0,
        });
      }
      
      const current = clientBudget.get(item.client);
      clientBudget.set(item.client, {
        total: current.total + item.totalBudget,
        burned: current.burned + item.burnedBudget,
        remaining: current.remaining + item.remainingBudget,
      });
    });

    return Array.from(clientBudget, ([client, budget]) => ({
      client,
      ...budget,
    }));
  }, [data]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const PERFORMANCE_COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
      <Card>
        <CardHeader>
          <CardTitle>Service Line Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serviceLineData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {serviceLineData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={performanceData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PERFORMANCE_COLORS[index % PERFORMANCE_COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Budget by Client</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={budgetByClient}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <XAxis dataKey="client" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="total" name="Total Budget" fill="#8884d8" />
              <Bar dataKey="burned" name="Burned Budget" fill="#82ca9d" />
              <Bar dataKey="remaining" name="Remaining Budget" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartSection;
