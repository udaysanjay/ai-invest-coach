
import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Chatbot = () => {
  const [messages, setMessages] = useState<{type: 'user' | 'bot', content: string}[]>([
    {type: 'bot', content: 'Hi there! I\'m your FinanceAI assistant. How can I help you today?'}
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {type: 'user', content: inputMessage}]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot', 
        content: 'Thanks for your question! I\'m here to help with your financial inquiries.'
      }]);
    }, 1000);
    
    // Clear input
    setInputMessage('');
    
    // Show sent notification
    toast({
      title: "Message sent",
      description: "Your message has been sent to FinanceAI.",
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col h-[calc(100vh-12rem)]">
          <div className="flex items-center mb-6">
            <MessageCircle className="h-8 w-8 mr-4 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">FinanceAI Chatbot</h1>
          </div>
          
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your financial question here..."
              className="flex-1"
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Chatbot;
