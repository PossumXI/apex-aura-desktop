import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Minimize2, Download, CreditCard, Package } from "lucide-react";

interface DownloadWidgetProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const DownloadWidget = ({ onClose, isMinimized, onToggleMinimize }: DownloadWidgetProps) => {
  const [isPurchasing, setIsPurchasing] = useState(false);

  const productInfo = {
    name: "Apex OS 1.0",
    price: "$49.99",
    description: "Complete Operating System Package",
    features: [
      "Native Rust Architecture",
      "AI-Powered Desktop Environment", 
      "Blockchain Integration (AURA)",
      "Advanced Security (Aegis)",
      "Cross-Platform Compatibility",
      "Complete Source Code"
    ],
    downloadSize: "2.4 GB",
    format: "Compressed Archive (.zip)"
  };

  const handlePurchase = () => {
    setIsPurchasing(true);
    // Simulate purchase process
    setTimeout(() => {
      setIsPurchasing(false);
      // Here you would integrate with actual payment processing
      alert("Purchase simulation complete! In production, this would redirect to payment processor.");
    }, 2000);
  };

  if (isMinimized) {
    return (
      <Card className="fixed bottom-20 right-24 w-16 h-16 glass-strong border-primary/20 cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={onToggleMinimize}>
        <CardContent className="p-0 flex items-center justify-center h-full">
          <Download className="w-6 h-6 text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed top-20 left-4 w-80 h-[32rem] glass-strong border-primary/10 hierarchy-primary transition-all duration-500 animate-float rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/10">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Download Apex OS
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" className="interactive-element rounded-xl" onClick={onToggleMinimize}>
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="interactive-element rounded-xl" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-8 space-y-6">
        {/* Product Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Package className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold text-lg">{productInfo.name}</h3>
              <p className="text-sm text-muted-foreground">{productInfo.description}</p>
            </div>
          </div>

          <div className="glass-light p-5 rounded-2xl space-y-3 hierarchy-tertiary">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="text-2xl font-bold text-primary">{productInfo.price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Size</span>
              <Badge variant="outline" className="rounded-xl">{productInfo.downloadSize}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Format</span>
              <Badge variant="secondary" className="rounded-xl">{productInfo.format}</Badge>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-primary">What's Included</h4>
            <ul className="space-y-2">
              {productInfo.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Purchase Button */}
          <Button
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-4 interactive-element rounded-2xl hierarchy-secondary"
            onClick={handlePurchase}
            disabled={isPurchasing}
          >
            {isPurchasing ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Purchase & Download</span>
              </div>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Secure payment processing. Instant download after purchase.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadWidget;