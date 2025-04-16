
import { useUser } from "@/context/UserContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import PortfolioChart from "@/components/dashboard/PortfolioChart";

const Index = () => {
  const userData = useUser();
  const totalInvestments = userData.investments.reduce((acc, inv) => acc + inv.amount, 0);
  const averageReturn = (userData.investments.reduce((acc, inv) => acc + (inv.amount * inv.return), 0) / totalInvestments).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userData.name}</h1>
          <p className="text-gray-600 mt-2">Here's your financial overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Investments"
            value={`$${totalInvestments.toLocaleString()}`}
            trend={8.5}
          />
          <StatCard
            title="Available Savings"
            value={`$${userData.savings.toLocaleString()}`}
          />
          <StatCard
            title="Average Return"
            value={`${averageReturn}%`}
            trend={2.1}
          />
        </div>

        {/* Portfolio Chart */}
        <div className="mt-8">
          <PortfolioChart />
        </div>

        {/* Investment Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Investment Breakdown</h2>
          <div className="divide-y divide-gray-100">
            {userData.investments.map((investment) => (
              <div key={investment.type} className="py-4 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{investment.type}</h3>
                  <p className="text-sm text-gray-500">${investment.amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${investment.return >= 5 ? 'text-green-600' : 'text-gray-600'}`}>
                    {investment.return}% return
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
