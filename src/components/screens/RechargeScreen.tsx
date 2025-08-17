import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import parkqwikIcon from "@/assets/parkqwik-icon-official.png";

const presetAmounts = [100, 200, 500, 1000, 2000, 5000];

export const RechargeScreen = () => {
  const [vehicleNumber, setVehicleNumber] = useState("HR 26 DQ 1234");
  const [amount, setAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePresetSelect = (preset: number) => {
    setAmount(preset.toString());
    setSelectedPreset(preset);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    setSelectedPreset(null);
  };

  const handleRecharge = async () => {
    if (!amount || parseFloat(amount) < 10) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an amount of at least ₹10",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Recharge Successful! 🎉",
        description: `₹${amount} has been added to your FASTag balance`,
      });
      setAmount("");
      setSelectedPreset(null);
    }, 2000);
  };

  return (
    <div className="p-4 pb-24 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 mx-auto mb-4">
          <img 
            src={parkqwikIcon} 
            alt="ParkQwik" 
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Recharge FASTag</h1>
        <p className="text-muted-foreground">
          Add money to your FASTag for seamless toll payments
        </p>
      </div>

      {/* Vehicle Details */}
      <Card className="parkqwik-card p-4">
        <div className="space-y-4">
          <Label htmlFor="vehicle" className="text-sm font-medium text-foreground">
            Vehicle Number
          </Label>
          <Input
            id="vehicle"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="text-center font-semibold text-lg tracking-wider uppercase"
            placeholder="Enter vehicle number"
          />
        </div>
      </Card>

      {/* Amount Selection */}
      <Card className="parkqwik-card p-4 space-y-4">
        <Label className="text-sm font-medium text-foreground">
          Select Amount
        </Label>
        
        {/* Preset Amounts */}
        <div className="grid grid-cols-3 gap-3">
          {presetAmounts.map((preset) => (
            <Button
              key={preset}
              variant={selectedPreset === preset ? "default" : "outline"}
              onClick={() => handlePresetSelect(preset)}
              className={`h-12 transition-all duration-300 ${
                selectedPreset === preset 
                  ? "parkqwik-button transform scale-105" 
                  : "border-border hover:border-primary"
              }`}
            >
              ₹{preset}
            </Button>
          ))}
        </div>

        {/* Custom Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm text-muted-foreground">
            Or enter custom amount
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground font-medium">
              ₹
            </span>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0"
              className="pl-8 text-lg font-semibold text-center"
            />
          </div>
        </div>
      </Card>

      {/* Payment Method */}
      <Card className="parkqwik-card p-4 space-y-4">
        <Label className="text-sm font-medium text-foreground">
          Payment Method
        </Label>
        
        <div className="flex items-center gap-3 p-3 border border-primary/20 rounded-xl bg-primary/5">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">UPI / Cards</p>
            <p className="text-sm text-muted-foreground">Secure payment gateway</p>
          </div>
          <div className="w-2 h-2 bg-primary rounded-full" />
        </div>
      </Card>

      {/* Recharge Button */}
      <Button
        onClick={handleRecharge}
        disabled={!amount || parseFloat(amount) < 10 || isProcessing}
        className="w-full h-14 parkqwik-button text-lg font-semibold disabled:opacity-50 disabled:transform-none"
      >
        {isProcessing ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            Processing Payment...
          </div>
        ) : (
          `Pay ₹${amount || "0"}`
        )}
      </Button>

      {/* Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Your payment is secured with 256-bit SSL encryption</p>
      </div>
    </div>
  );
};