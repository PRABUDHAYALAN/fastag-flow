import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface BottomTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const BottomTabs = ({ tabs, activeTab, onTabChange }: BottomTabsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-2 safe-area-padding">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300",
              "min-w-[60px] relative",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {/* Tab indicator */}
            {activeTab === tab.id && (
              <div className="absolute inset-0 tab-indicator opacity-10 animate-bounce-in" />
            )}
            
            <div className={cn(
              "transition-transform duration-300",
              activeTab === tab.id ? "scale-110" : "scale-100"
            )}>
              {tab.icon}
            </div>
            
            <span className={cn(
              "text-xs font-medium mt-1 transition-all duration-300",
              activeTab === tab.id ? "opacity-100 transform scale-100" : "opacity-70 transform scale-95"
            )}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};