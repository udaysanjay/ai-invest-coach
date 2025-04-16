
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, BarChart2, MessageCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-6">
          Your Gen AI Powered Financial Assistant
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Make smarter financial decisions and grow your wealth with personalized investment guidance powered by artificial intelligence.
        </p>
        <Button size="lg" className="gap-2">
          Start Investing <ArrowRight />
        </Button>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Smart Investing */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Investing</h3>
            <p className="text-gray-600">
              Get personalized portfolio suggestions tailored to your risk tolerance and financial goals, powered by advanced AI algorithms.
            </p>
          </div>

          {/* Investment Analysis */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <BarChart2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Analyzing Investments</h3>
            <p className="text-gray-600">
              Track your investment performance with real-time visual analytics and get insights to optimize your portfolio.
            </p>
          </div>

          {/* Finance Chatbot */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <MessageCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Finance Chatbot</h3>
            <p className="text-gray-600">
              Get instant answers to your financial questions and learn about investing through our friendly AI-powered chatbot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
