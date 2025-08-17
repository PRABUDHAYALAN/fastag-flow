import { useState } from "react";
import { BottomTabs } from "@/components/ui/bottom-tabs";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { RechargeScreen } from "@/components/screens/RechargeScreen";
import { HistoryScreen } from "@/components/screens/HistoryScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import { Home, Zap, Clock, User } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
    { id: "recharge", label: "Recharge", icon: <Zap className="w-5 h-5" /> },
    { id: "history", label: "History", icon: <Clock className="w-5 h-5" /> },
    { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  ];

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "recharge":
        return <RechargeScreen />;
      case "history":
        return <HistoryScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-parkqwik-background">
      {/* Main Content */}
      <main className="max-w-md mx-auto bg-background min-h-screen relative">
        {renderActiveScreen()}
      </main>

      {/* Bottom Navigation */}
      <BottomTabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
};

export default Index;
