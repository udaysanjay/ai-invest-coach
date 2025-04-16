
import { BarChart3 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Investments = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex items-center mb-6">
            <BarChart3 className="h-8 w-8 mr-4 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Investment Tracking</h1>
          </div>
          <div className="space-y-4 text-gray-600">
            <p>Coming soon: Comprehensive investment tracking and analysis tools!</p>
            <p>This page will provide detailed insights into your investment portfolio, performance metrics, and personalized recommendations.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Investments;
