
import { createContext, useContext, ReactNode } from "react";

interface Investment {
  type: string;
  amount: number;
  return: number;
}

interface MonthlyData {
  month: string;
  value: number;
}

interface UserData {
  name: string;
  income: number;
  savings: number;
  investments: Investment[];
  monthlyData: MonthlyData[];
}

const sampleUserData: UserData = {
  name: "Alex Thompson",
  income: 45000,
  savings: 12000,
  investments: [
    { type: "Index Funds", amount: 5000, return: 8.2 },
    { type: "Bonds", amount: 3000, return: 3.5 },
    { type: "Stocks", amount: 4000, return: 12.1 }
  ],
  monthlyData: [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 12400 },
    { month: "Mar", value: 12800 },
    { month: "Apr", value: 13100 },
    { month: "May", value: 12900 },
    { month: "Jun", value: 13500 }
  ]
};

const UserContext = createContext<UserData>(sampleUserData);

export function UserProvider({ children }: { children: ReactNode }) {
  return (
    <UserContext.Provider value={sampleUserData}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
