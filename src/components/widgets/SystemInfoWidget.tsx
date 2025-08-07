import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Minimize2, Maximize2, Cpu, HardDrive, Zap, Shield, Code, Layers } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SystemInfoWidgetProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const SystemInfoWidget = ({ onClose, isMinimized, onToggleMinimize }: SystemInfoWidgetProps) => {
  const [activeSection, setActiveSection] = useState("overview");

  const systemInfo = {
    version: "Apex OS 1.0.0",
    build: "2024.12.07-STABLE",
    architecture: "x64 Rust-Native",
    kernel: "Apex-Core 1.0",
    security: "Aegis-Enhanced",
    aiVersion: "APEX-1 Neural Framework"
  };

  if (isMinimized) {
    return (
      <Card className="fixed bottom-20 right-4 w-16 h-16 glass-strong border-primary/20 cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={onToggleMinimize}>
        <CardContent className="p-0 flex items-center justify-center h-full">
          <Cpu className="w-6 h-6 text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed top-20 right-4 w-96 h-[32rem] glass-strong border-primary/20 transition-all duration-500 animate-float">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/10">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          System Information
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={onToggleMinimize}>
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 h-full">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-24 border-r border-white/10 p-2 space-y-2">
            {[
              { id: "overview", icon: Layers, label: "Overview" },
              { id: "architecture", icon: Code, label: "Arch" },
              { id: "security", icon: Shield, label: "Security" },
              { id: "performance", icon: Zap, label: "Perf" }
            ].map(({ id, icon: Icon, label }) => (
              <Button
                key={id}
                variant={activeSection === id ? "default" : "ghost"}
                size="sm"
                className="w-full flex flex-col p-2 h-auto glass-light hover:glass-strong"
                onClick={() => setActiveSection(id)}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            {activeSection === "overview" && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Version</span>
                    <Badge variant="secondary" className="glass-light">{systemInfo.version}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Build</span>
                    <Badge variant="outline" className="glass-light">{systemInfo.build}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Architecture</span>
                    <Badge variant="secondary" className="glass-light">{systemInfo.architecture}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Kernel</span>
                    <Badge variant="outline" className="glass-light">{systemInfo.kernel}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Security</span>
                    <Badge variant="destructive" className="glass-light">{systemInfo.security}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">AI Engine</span>
                    <Badge className="glass-light bg-gradient-to-r from-primary to-accent text-primary-foreground">{systemInfo.aiVersion}</Badge>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "architecture" && (
              <div className="space-y-4">
                <div className="text-sm space-y-2">
                  <h4 className="font-semibold text-primary">Core Components</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground ml-2">
                    <li>• Desktop Manager (Rust)</li>
                    <li>• AI Integration Layer</li>
                    <li>• AURA Blockchain Node</li>
                    <li>• Security Center (Aegis)</li>
                    <li>• Compatibility Engine</li>
                  </ul>
                  
                  <h4 className="font-semibold text-primary mt-4">Tech Stack</h4>
                  <ul className="text-xs space-y-1 text-muted-foreground ml-2">
                    <li>• Language: Rust (Native)</li>
                    <li>• GUI: egui Framework</li>
                    <li>• AI: APEX-1 Neural Net</li>
                    <li>• Blockchain: Substrate</li>
                    <li>• Security: Zero-Trust</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="space-y-4">
                <div className="text-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Threat Level</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">LOW</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Firewall</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">ACTIVE</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Encryption</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">AES-256</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Zero-Trust</span>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">ENABLED</Badge>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "performance" && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>12%</span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[12%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory</span>
                      <span>34%</span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full w-[34%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Network</span>
                      <span>5.2 MB/s</span>
                    </div>
                    <div className="w-full bg-muted/20 rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[45%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemInfoWidget;