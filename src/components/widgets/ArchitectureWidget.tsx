import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Minimize2, Code, Database, Shield, Zap, Brain, Globe } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ArchitectureWidgetProps {
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const ArchitectureWidget = ({ onClose, isMinimized, onToggleMinimize }: ArchitectureWidgetProps) => {
  const architectureData = {
    principles: [
      "Zero-Trust Security",
      "Formal Verification", 
      "AI-Native Design",
      "Cross-Platform Unity",
      "Blockchain Integration"
    ],
    layers: [
      { name: "User Interface Layer", components: ["Desktop Manager", "AI Assistant", "Security Center", "Wallet"] },
      { name: "Application Layer", components: ["Compatibility Engine", "Theme Manager", "Widget System", "Browser"] },
      { name: "Integration Layer", components: ["APEX-1 AI Client", "AURA Node", "Security APIs", "Platform"] },
      { name: "Core Services", components: ["IPC System", "Memory Manager", "Crypto Engine", "Network"] }
    ],
    technologies: [
      { name: "Language", value: "Rust", icon: Code },
      { name: "AI Engine", value: "APEX-1", icon: Brain },
      { name: "Blockchain", value: "AURA", icon: Globe },
      { name: "Security", value: "Aegis", icon: Shield },
      { name: "Performance", value: "Native", icon: Zap },
      { name: "Database", value: "Vector DB", icon: Database }
    ]
  };

  if (isMinimized) {
    return (
      <Card className="fixed bottom-20 left-4 w-16 h-16 glass-strong border-primary/20 cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={onToggleMinimize}>
        <CardContent className="p-0 flex items-center justify-center h-full">
          <Code className="w-6 h-6 text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed top-20 left-[32rem] w-96 h-[32rem] glass-strong border-primary/10 hierarchy-primary transition-all duration-500 animate-float rounded-3xl">
      <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-white/10">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Architecture
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
      
      <CardContent className="p-6 h-full overflow-y-auto custom-scrollbar">
        <Tabs defaultValue="principles" className="h-full">
          <TabsList className="grid w-full grid-cols-3 glass-light hierarchy-tertiary rounded-2xl">
            <TabsTrigger value="principles">Principles</TabsTrigger>
            <TabsTrigger value="layers">Layers</TabsTrigger>
            <TabsTrigger value="tech">Tech Stack</TabsTrigger>
          </TabsList>
          
          <TabsContent value="principles" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-primary">Core Design Principles</h4>
              {architectureData.principles.map((principle, index) => (
                <div key={index} className="glass-light p-4 rounded-2xl flex items-center space-x-3 hierarchy-tertiary">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{principle}</span>
                </div>
              ))}
            </div>
            
            <div className="glass-light p-5 rounded-2xl hierarchy-tertiary">
              <h5 className="font-medium text-sm mb-2 text-accent">Key Features</h5>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Mathematical proof of critical components</li>
                <li>• Intelligence built into core architecture</li>
                <li>• Single codebase, multiple platforms</li>
                <li>• Native AURA ecosystem integration</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="layers" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-primary">System Architecture</h4>
              {architectureData.layers.map((layer, index) => (
                <div key={index} className="glass-light p-4 rounded-2xl hierarchy-tertiary">
                  <h5 className="font-medium text-sm mb-2 text-accent">{layer.name}</h5>
                  <div className="flex flex-wrap gap-2">
                    {layer.components.map((component, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs glass-light rounded-xl">
                        {component}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tech" className="space-y-4 mt-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-primary">Technology Stack</h4>
              <div className="grid gap-3">
                {architectureData.technologies.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <div key={index} className="glass-light p-4 rounded-2xl flex items-center justify-between hierarchy-tertiary">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">{tech.name}</span>
                      </div>
                      <Badge variant="secondary" className="glass-light rounded-xl">{tech.value}</Badge>
                    </div>
                  );
                })}
              </div>
              
              <div className="glass-light p-4 rounded-2xl hierarchy-tertiary">
                <h5 className="font-medium text-sm mb-2 text-accent">Performance Benefits</h5>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Zero-cost abstractions</li>
                  <li>• Memory safety without garbage collection</li>
                  <li>• Fearless concurrency</li>
                  <li>• Compile-time guarantees</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ArchitectureWidget;