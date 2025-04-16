
export default function EducationHub() {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Financial Education Hub</h2>
      
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Investment Basics</h3>
          <p className="text-gray-600">
            Investing is the process of buying assets that increase in value over time and provide returns in the form of income payments or capital gains. Common investment types include stocks, bonds, mutual funds, and ETFs.
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Risk Management</h3>
          <p className="text-gray-600">
            Diversification is key to managing investment risk. By spreading investments across different asset classes and sectors, you can reduce the impact of poor performance in any single investment.
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Getting Started</h3>
          <p className="text-gray-600">
            Before investing, establish an emergency fund and clear high-interest debt. Start with a small amount regularly rather than waiting to invest a large sum. Consider your risk tolerance and investment timeline.
          </p>
        </div>
      </div>
    </div>
  );
}
