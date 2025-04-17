
import { Button } from "@/components/ui/button";
import { MessageCircle, BookOpen, BarChart3, UserRound, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            FinanceAI
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={() => navigate("/")}>
            <Home className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={() => navigate("/profile")}>
            <UserRound className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={() => navigate("/education")}>
            <BookOpen className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={() => navigate("/investments")}>
            <BarChart3 className="h-5 w-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={() => navigate("/chatbot")}>
            <MessageCircle className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
