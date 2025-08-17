import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Search, 
  Plus, 
  Minus, 
  MapPin, 
  CreditCard,
  Filter
} from "lucide-react";

interface Transaction {
  id: string;
  type: "recharge" | "toll";
  amount: number;
  description: string;
  location?: string;
  timestamp: Date;
  status: "completed" | "pending" | "failed";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "toll",
    amount: -85.00,
    description: "Delhi-Gurgaon Expressway",
    location: "Toll Plaza 1",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "completed"
  },
  {
    id: "2",
    type: "recharge",
    amount: 1000.00,
    description: "FASTag Recharge",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: "completed"
  },
  {
    id: "3",
    type: "toll",
    amount: -45.00,
    description: "Mumbai-Pune Expressway",
    location: "Toll Plaza 3",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "completed"
  },
  {
    id: "4",
    type: "toll",
    amount: -120.00,
    description: "Yamuna Expressway",
    location: "Toll Plaza 2",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "completed"
  },
  {
    id: "5",
    type: "recharge",
    amount: 500.00,
    description: "FASTag Recharge",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "completed"
  }
];

export const HistoryScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "recharge" | "toll">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || transaction.type === filter;
    return matchesSearch && matchesFilter;
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return diffInHours === 0 ? "Just now" : `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getTransactionIcon = (type: string, amount: number) => {
    if (type === "recharge") {
      return <Plus className="w-4 h-4 text-secondary" />;
    }
    return <Minus className="w-4 h-4 text-red-500" />;
  };

  const getTransactionColor = (type: string) => {
    return type === "recharge" ? "text-secondary" : "text-red-500";
  };

  return (
    <div className="p-4 pb-24 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "parkqwik-button" : ""}
          >
            All
          </Button>
          <Button
            variant={filter === "recharge" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("recharge")}
            className={filter === "recharge" ? "parkqwik-button" : ""}
          >
            Recharge
          </Button>
          <Button
            variant={filter === "toll" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("toll")}
            className={filter === "toll" ? "parkqwik-button" : ""}
          >
            Toll
          </Button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} className="parkqwik-card p-4 shimmer-loading">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="w-3/4 h-4 bg-muted rounded animate-pulse" />
                  <div className="w-1/2 h-3 bg-muted rounded animate-pulse" />
                </div>
                <div className="w-16 h-4 bg-muted rounded animate-pulse" />
              </div>
            </Card>
          ))
        ) : filteredTransactions.length === 0 ? (
          <Card className="parkqwik-card p-8 text-center">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">No transactions found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search terms" : "Your transaction history will appear here"}
            </p>
          </Card>
        ) : (
          filteredTransactions.map((transaction, index) => (
            <Card 
              key={transaction.id} 
              className="parkqwik-card p-4 animate-slide-up hover:scale-105 transition-transform duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  transaction.type === "recharge" 
                    ? "bg-secondary/10" 
                    : "bg-red-50 dark:bg-red-950"
                }`}>
                  {transaction.type === "recharge" ? (
                    <CreditCard className="w-5 h-5 text-secondary" />
                  ) : (
                    <MapPin className="w-5 h-5 text-red-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-foreground truncate">
                      {transaction.description}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className="text-xs shrink-0"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(transaction.timestamp)}</span>
                    {transaction.location && (
                      <>
                        <span>•</span>
                        <span className="truncate">{transaction.location}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className={`flex items-center gap-1 font-semibold ${
                    getTransactionColor(transaction.type)
                  }`}>
                    {getTransactionIcon(transaction.type, transaction.amount)}
                    <span>₹{Math.abs(transaction.amount).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};