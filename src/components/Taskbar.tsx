import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Settings, Download, Upload, Info } from "lucide-react";
// Using the uploaded taskbar icon

interface TaskbarProps {
  onOpenWidget: (widget: string) => void;
}

const Taskbar = ({ onOpenWidget }: TaskbarProps) => {
  const [currentTime] = useState(new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  }));

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[var(--taskbar-height)] glass-strong border-t border-white/10 z-50 hierarchy-primary">
      <div className="flex items-center justify-between px-8 h-full">
        {/* Start Menu Button */}
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            className="glass-light hover:glass-strong p-3 rounded-2xl interactive-element hierarchy-secondary"
            onClick={() => onOpenWidget('menu')}
          >
            <img 
              src="/lovable-uploads/07397ce3-690e-4b28-ac0e-b1d133460eb4.png" 
              alt="Apex OS" 
              className="w-7 h-7 object-contain animate-pulse-glow"
            />
          </Button>
        </div>

        {/* Center - Quick Access Icons */}
        <div className="flex items-center space-x-3 bg-white/5 rounded-2xl p-2 glass-light hierarchy-tertiary">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-white/10 p-3 rounded-xl interactive-element"
            onClick={() => onOpenWidget('system-info')}
          >
            <Info className="w-4 h-4 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-white/10 p-3 rounded-xl interactive-element"
            onClick={() => onOpenWidget('download')}
          >
            <Download className="w-4 h-4 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-white/10 p-3 rounded-xl interactive-element"
            onClick={() => onOpenWidget('upload')}
          >
            <Upload className="w-4 h-4 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-white/10 p-3 rounded-xl interactive-element"
            onClick={() => onOpenWidget('settings')}
          >
            <Settings className="w-4 h-4 text-primary" />
          </Button>
        </div>

        {/* System Tray */}
        <div className="flex items-center space-x-6">
          <div className="glass-light px-4 py-2 rounded-2xl hierarchy-tertiary">
            <span className="text-sm font-medium text-foreground/90">{currentTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;