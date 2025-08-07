import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Settings, Download, Upload, Info } from "lucide-react";
import apexLogo from "@/assets/apex-logo.png";

interface TaskbarProps {
  onOpenWidget: (widget: string) => void;
}

const Taskbar = ({ onOpenWidget }: TaskbarProps) => {
  const [currentTime] = useState(new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  }));

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[var(--taskbar-height)] glass-strong border-t border-white/20 z-50">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Start Menu Button */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="glass-light hover:glass-strong p-2 rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => onOpenWidget('menu')}
          >
            <img 
              src={apexLogo} 
              alt="Apex OS" 
              className="w-8 h-8 object-contain animate-pulse-glow"
            />
          </Button>
        </div>

        {/* Center - Quick Access Icons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="glass-light hover:glass-strong p-3 rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => onOpenWidget('system-info')}
          >
            <Info className="w-5 h-5 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="glass-light hover:glass-strong p-3 rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => onOpenWidget('download')}
          >
            <Download className="w-5 h-5 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="glass-light hover:glass-strong p-3 rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => onOpenWidget('upload')}
          >
            <Upload className="w-5 h-5 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="glass-light hover:glass-strong p-3 rounded-xl transition-all duration-300 hover:scale-105"
            onClick={() => onOpenWidget('settings')}
          >
            <Settings className="w-5 h-5 text-primary" />
          </Button>
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-4">
          <div className="glass-light px-4 py-2 rounded-xl">
            <span className="text-sm font-medium text-foreground">{currentTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;