import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Eye, EyeOff } from "lucide-react";
import parkqwikLogo from "@/assets/parkqwik-logo-official.png";

export const HomeScreen = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [showBalance, setShowBalance] = useState(true);
  const [userName] = useState("Rahul Sharma");

  useEffect(() => {
    // Simulate loading balance
    const timer = setTimeout(() => {
      setBalance(2450.75);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="p-4 pb-24 space-y-6 animate-fade-in">
      {/* Header with Logo Only */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-auto">
          <img 
            src={parkqwikLogo} 
            alt="ParkQwik" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* FASTag Balance Card */}
      <Card className="parkqwik-card balance-card text-white p-6 relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-white/80 text-sm font-medium">FASTag Balance</p>
            <div className="flex items-center gap-3 mt-2">
              {balance === null ? (
                <div className="shimmer-loading w-24 h-8 bg-white/20 rounded animate-pulse" />
              ) : (
                <h2 className="text-3xl font-bold">
                  {showBalance ? `₹${balance.toFixed(2)}` : "₹••••••"}
                </h2>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white hover:bg-white/20 p-1"
              >
                {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-white/80 text-xs">Vehicle Number</p>
            <p className="text-white font-semibold">HR 26 DQ 1234</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-xs">Status</p>
            <p className="text-white font-semibold">Active</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />
      </Card>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <Card className="parkqwik-card p-4 cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Recharge</h4>
                <p className="text-sm text-muted-foreground">Add money to FASTag</p>
              </div>
            </div>
          </Card>

          <Card className="parkqwik-card p-4 cursor-pointer hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <CreditCard className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Transactions</h4>
                <p className="text-sm text-muted-foreground">View history</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        
        <Card className="parkqwik-card p-4 animate-slide-up">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
              </div>
              <div>
                <p className="font-medium text-foreground">Toll Payment</p>
                <p className="text-sm text-muted-foreground">Delhi-Gurgaon Expressway</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-red-600">-₹85.00</p>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};