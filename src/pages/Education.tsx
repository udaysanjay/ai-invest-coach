
import { Book } from "lucide-react";

const Education = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <div className="flex items-center mb-6">
          <Book className="h-8 w-8 mr-4 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-800">Financial Education</h1>
        </div>
        <div className="space-y-4 text-gray-600">
          <p>Welcome to the FinanceAI Education Hub!</p>
          <p>Here, you'll find comprehensive resources to help you understand financial concepts, investment strategies, and personal finance management.</p>
          <h2 className="text-xl font-semibold mt-6 text-gray-800">Topics We Cover:</h2>
          <ul className="list-disc list-inside">
            <li>Investment Basics</li>
            <li>Risk Management</li>
            <li>Portfolio Diversification</li>
            <li>Saving and Budgeting</li>
            <li>Understanding Market Trends</li>
          </ul>
          <p className="mt-6">Our AI-powered guides will help you learn at your own pace and make informed financial decisions.</p>
        </div>
      </div>
    </div>
  );
};

export default Education;
