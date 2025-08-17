import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Car, 
  Bell, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  Settings,
  ChevronRight,
  Phone,
  Mail,
  Edit
} from "lucide-react";
import parkqwikIcon from "@/assets/parkqwik-icon-official.png";

export const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 98765 43210",
    vehicleNumber: "HR 26 DQ 1234"
  });
  const [notifications, setNotifications] = useState({
    tollAlerts: true,
    rechargeAlerts: true,
    balanceAlerts: true
  });

  const menuItems = [
    { icon: Car, label: "Vehicle Management", description: "Manage your vehicles", hasArrow: true },
    { icon: CreditCard, label: "Payment Methods", description: "Cards and UPI", hasArrow: true },
    { icon: Bell, label: "Notifications", description: "Manage alerts", hasArrow: true },
    { icon: Shield, label: "Security", description: "Privacy & security", hasArrow: true },
    { icon: HelpCircle, label: "Help & Support", description: "FAQs and contact", hasArrow: true },
    { icon: Settings, label: "App Settings", description: "General settings", hasArrow: true },
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="p-4 pb-24 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="relative mx-auto w-24 h-24">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center p-1">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <img 
                src={parkqwikIcon} 
                alt="ParkQwik" 
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-full flex items-center justify-center border-2 border-background">
            <Edit className="w-4 h-4 text-foreground" />
          </div>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-foreground">{userInfo.name}</h1>
          <p className="text-muted-foreground">ParkQwik Member</p>
        </div>
      </div>

      {/* User Info Card */}
      <Card className="parkqwik-card p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-foreground">Personal Information</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="text-primary hover:bg-primary/10"
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                value={userInfo.name}
                onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                disabled={!isEditing}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle" className="text-sm font-medium">
              Vehicle Number
            </Label>
            <div className="relative">
              <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="vehicle"
                value={userInfo.vehicleNumber}
                onChange={(e) => setUserInfo({...userInfo, vehicleNumber: e.target.value})}
                disabled={!isEditing}
                className="pl-10 uppercase tracking-wide font-semibold"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="parkqwik-card p-4 space-y-4">
        <h3 className="font-semibold text-foreground">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Toll Payment Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified of toll deductions</p>
            </div>
            <Switch
              checked={notifications.tollAlerts}
              onCheckedChange={(checked) => 
                setNotifications({...notifications, tollAlerts: checked})
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Recharge Confirmations</p>
              <p className="text-sm text-muted-foreground">Confirm successful recharges</p>
            </div>
            <Switch
              checked={notifications.rechargeAlerts}
              onCheckedChange={(checked) => 
                setNotifications({...notifications, rechargeAlerts: checked})
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Low Balance Alerts</p>
              <p className="text-sm text-muted-foreground">Alert when balance is low</p>
            </div>
            <Switch
              checked={notifications.balanceAlerts}
              onCheckedChange={(checked) => 
                setNotifications({...notifications, balanceAlerts: checked})
              }
            />
          </div>
        </div>
      </Card>

      {/* Menu Items */}
      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <Card 
            key={item.label} 
            className="parkqwik-card p-4 cursor-pointer hover:scale-105 transition-transform duration-300"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              
              {item.hasArrow && (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Version Info */}
      <div className="text-center space-y-3 pt-4">
        <div className="w-16 h-16 mx-auto">
          <img 
            src={parkqwikIcon} 
            alt="ParkQwik" 
            className="w-full h-full object-contain opacity-60"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold">ParkQwik v1.0.0</p>
          <p>Made with ❤️ for seamless travel</p>
        </div>
      </div>
    </div>
  );
};