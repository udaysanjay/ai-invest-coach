
import { useUser } from "@/context/UserContext";
import PortfolioChart from "@/components/dashboard/PortfolioChart";

export default function UserProfile() {
  const userData = useUser();

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Welcome, {userData.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Monthly Income</h3>
          <p className="text-2xl font-bold text-purple-600">${userData.income}</p>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Savings</h3>
          <p className="text-2xl font-bold text-blue-600">${userData.savings}</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Investments</h3>
          <p className="text-2xl font-bold text-green-600">
            ${userData.investments.reduce((acc, inv) => acc + inv.amount, 0)}
          </p>
        </div>
      </div>

      <PortfolioChart />
    </div>
  );
}
