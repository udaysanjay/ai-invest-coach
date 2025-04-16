
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUser } from '@/context/UserContext';

export default function PortfolioChart() {
  const userData = useUser();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-[400px]">
      <h2 className="text-lg font-semibold mb-4">Portfolio Growth</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={userData.monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
