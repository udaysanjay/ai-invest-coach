
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowChat(true);
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
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Welcome to FinanceAI!</p>
                  <p className="text-sm text-blue-700">
                    I'm here to help you make smarter investment decisions. Based on your financial information,
                    I'll provide personalized guidance to help you grow your wealth. What would you like to know about first?
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
