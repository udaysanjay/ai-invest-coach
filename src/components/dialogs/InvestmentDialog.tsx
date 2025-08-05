
import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function InvestmentDialog({ 
  open, 
  onOpenChange 
}: { 
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [showChat, setShowChat] = useState(false);
  const [formData, setFormData] = useState({
    monthlyEarning: "",
    savings: "",
    expenses: "",
  });
  const [messages, setMessages] = useState<{type: 'user' | 'bot', content: string}[]>([
    {type: 'bot', content: "Welcome to FinanceAI! I'm here to help you make smarter investment decisions. Based on your financial information, I'll provide personalized guidance to help you grow your wealth. What would you like to know about first?"}
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowChat(true);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;
    
    const currentMessage = userInput;
    setUserInput("");
    setIsLoading(true);
    
    // Add user message
    setMessages(prev => [...prev, {type: 'user', content: currentMessage}]);
    
    try {
      const { data, error } = await supabase.functions.invoke('chat-gemini', {
        body: {
          messages: [...messages, {type: 'user', content: currentMessage}],
          financialData: formData
        }
      });

      if (error) {
        throw error;
      }

      // Add bot response
      setMessages(prev => [...prev, {
        type: 'bot', 
        content: data.response || "I'm here to help with your financial questions. Could you please try again?"
      }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [...prev, {
        type: 'bot', 
        content: "I'm experiencing some technical difficulties. Please ensure the Gemini API key is configured and try again."
      }]);
      
      toast({
        title: "Connection Error",
        description: "Unable to connect to AI service. Please check your API configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Get Started with FinanceAI</DialogTitle>
          <DialogDescription>
            Please provide your financial information to get personalized investment advice.
          </DialogDescription>
        </DialogHeader>

        {!showChat ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Monthly Earning</label>
              <input
                type="number"
                className="w-full mt-1 p-2 border rounded-md"
                value={formData.monthlyEarning}
                onChange={(e) => setFormData({ ...formData, monthlyEarning: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Monthly Savings</label>
              <input
                type="number"
                className="w-full mt-1 p-2 border rounded-md"
                value={formData.savings}
                onChange={(e) => setFormData({ ...formData, savings: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Monthly Expenses</label>
              <input
                type="number"
                className="w-full mt-1 p-2 border rounded-md"
                value={formData.expenses}
                onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        ) : (
          <div className="space-y-4 h-[300px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-3 bg-gray-50 p-3 rounded-lg">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 text-sm rounded-lg ${
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
            
            <div className="flex gap-2 mt-auto">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1"
                disabled={isLoading}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
