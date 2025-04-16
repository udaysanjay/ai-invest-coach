
import { MessageCircle } from "lucide-react";

const Chatbot = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <div className="flex items-center mb-6">
          <MessageCircle className="h-8 w-8 mr-4 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800">FinanceAI Chatbot</h1>
        </div>
        <div className="space-y-4 text-gray-600">
          <p>Our AI-powered financial assistant is ready to help you!</p>
          <p>Ask questions about investments, financial planning, or get personalized advice.</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
