import { useState } from "react";
import DesktopVideo from "./DesktopVideo";
import Taskbar from "./Taskbar";
import SystemInfoWidget from "./widgets/SystemInfoWidget";
import DownloadWidget from "./widgets/DownloadWidget";
import UploadWidget from "./widgets/UploadWidget";
import ArchitectureWidget from "./widgets/ArchitectureWidget";

const Desktop = () => {
  const [openWidgets, setOpenWidgets] = useState<Set<string>>(new Set());
  const [minimizedWidgets, setMinimizedWidgets] = useState<Set<string>>(new Set());

  const handleOpenWidget = (widget: string) => {
    if (widget === 'menu') {
      // Toggle architecture widget when clicking the main menu
      if (openWidgets.has('architecture')) {
        closeWidget('architecture');
      } else {
        openWidget('architecture');
      }
    } else {
      openWidget(widget);
    }
  };

  const openWidget = (widget: string) => {
    setOpenWidgets(prev => new Set(prev).add(widget));
    setMinimizedWidgets(prev => {
      const newSet = new Set(prev);
      newSet.delete(widget);
      return newSet;
    });
  };

  const closeWidget = (widget: string) => {
    setOpenWidgets(prev => {
      const newSet = new Set(prev);
      newSet.delete(widget);
      return newSet;
    });
    setMinimizedWidgets(prev => {
      const newSet = new Set(prev);
      newSet.delete(widget);
      return newSet;
    });
  };

  const toggleMinimize = (widget: string) => {
    setMinimizedWidgets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(widget)) {
        newSet.delete(widget);
      } else {
        newSet.add(widget);
      }
      return newSet;
    });
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Background Video */}
      <DesktopVideo src="/path/to/your/background-video.mp4" />
      
      {/* Fallback gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900 -z-10" />
      
      {/* Desktop Widgets */}
      {openWidgets.has('system-info') && (
        <SystemInfoWidget
          onClose={() => closeWidget('system-info')}
          isMinimized={minimizedWidgets.has('system-info')}
          onToggleMinimize={() => toggleMinimize('system-info')}
        />
      )}
      
      {openWidgets.has('download') && (
        <DownloadWidget
          onClose={() => closeWidget('download')}
          isMinimized={minimizedWidgets.has('download')}
          onToggleMinimize={() => toggleMinimize('download')}
        />
      )}
      
      {openWidgets.has('upload') && (
        <UploadWidget
          onClose={() => closeWidget('upload')}
          isMinimized={minimizedWidgets.has('upload')}
          onToggleMinimize={() => toggleMinimize('upload')}
        />
      )}
      
      {openWidgets.has('architecture') && (
        <ArchitectureWidget
          onClose={() => closeWidget('architecture')}
          isMinimized={minimizedWidgets.has('architecture')}
          onToggleMinimize={() => toggleMinimize('architecture')}
        />
      )}

      {/* Taskbar */}
      <Taskbar onOpenWidget={handleOpenWidget} />
    </div>
  );
};

export default Desktop;