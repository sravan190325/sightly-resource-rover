
import { SummaryStats } from '@/types/resource';

interface SummaryBoxesProps {
  stats: SummaryStats;
}

const SummaryBoxes: React.FC<SummaryBoxesProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#F2FCE2] p-6 rounded-lg shadow-sm border border-[#F2FCE2]">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Avg Booking</h3>
        <p className="text-2xl font-semibold">{(stats.avgBooking * 100).toFixed(0)}%</p>
      </div>
      
      <div className="bg-[#FDE1D3] p-6 rounded-lg shadow-sm border border-[#FDE1D3]">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Team Distribution</h3>
        <p className="text-2xl font-semibold">
          DE: {stats.teamDistribution.DE} &nbsp; 
          BI: {stats.teamDistribution.BI} &nbsp; 
          DS: {stats.teamDistribution.DS}
        </p>
      </div>
      
      <div className="bg-[#E5DEFF] p-6 rounded-lg shadow-sm border border-[#E5DEFF]">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Contract Resources</h3>
        <p className="text-2xl font-semibold">{stats.contractCount}</p>
      </div>
    </div>
  );
};

export default SummaryBoxes;
