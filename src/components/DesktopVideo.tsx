import { useEffect, useRef } from "react";

interface DesktopVideoProps {
  src: string;
}

const DesktopVideo = ({ src }: DesktopVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Play video once then stop
      video.addEventListener('ended', () => {
        video.pause();
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="desktop-video"
      autoPlay
      muted
      playsInline
    >
      <source src={src} type="video/mp4" />
      {/* Placeholder gradient background if video fails to load */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-teal-900" />
    </video>
  );
};

export default DesktopVideo;