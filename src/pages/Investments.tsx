
import { BarChart3, TrendingUp, TrendingDown, IndianRupee } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";

const Investments = () => {
  const { investments } = useUser();

  // Mock stock data
  const stocks = [
    { id: 1, name: "Reliance Industries", symbol: "RELIANCE", price: 2458.75, change: 1.2, invested: 25000 },
    { id: 2, name: "Tata Consultancy Services", symbol: "TCS", price: 3742.80, change: -0.8, invested: 30000 },
    { id: 3, name: "HDFC Bank", symbol: "HDFCBANK", price: 1678.25, change: 0.5, invested: 20000 },
    { id: 4, name: "Infosys", symbol: "INFY", price: 1521.60, change: 1.7, invested: 22000 },
    { id: 5, name: "Bharti Airtel", symbol: "BHARTIARTL", price: 892.30, change: -0.3, invested: 18000 }
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex items-center mb-6">
            <BarChart3 className="h-8 w-8 mr-4 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Investment Tracking</h1>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Investments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {investments.map((investment, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{investment.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Invested</span>
                        <span className="font-medium flex items-center">
                          <IndianRupee className="h-4 w-4 mr-1" /> {investment.amount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Return</span>
                        <span className="font-medium text-green-600">{investment.return}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Company</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-600">Symbol</th>
                    <th className="py-3 px-4 text-right font-medium text-gray-600">Current Price</th>
                    <th className="py-3 px-4 text-right font-medium text-gray-600">Change</th>
                    <th className="py-3 px-4 text-right font-medium text-gray-600">Invested Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock) => (
                    <tr key={stock.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-left">{stock.name}</td>
                      <td className="py-3 px-4 text-left font-mono">{stock.symbol}</td>
                      <td className="py-3 px-4 text-right font-medium flex justify-end items-center">
                        <IndianRupee className="h-4 w-4 mr-1" /> {stock.price.toFixed(2)}
                      </td>
                      <td className={`py-3 px-4 text-right ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <div className="flex items-center justify-end">
                          {stock.change >= 0 ? 
                            <TrendingUp className="h-4 w-4 mr-1" /> : 
                            <TrendingDown className="h-4 w-4 mr-1" />}
                          {Math.abs(stock.change)}%
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium flex justify-end items-center">
                        <IndianRupee className="h-4 w-4 mr-1" /> {stock.invested.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Investments;
