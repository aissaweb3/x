import React from "react";

interface VideoProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
}

const Video: React.FC<VideoProps> = ({
  src,
  loop = true,
  controls = false,
}) => {
  return (
    <div
      className="absolute inset-0 z-[-1] overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <video
        autoPlay
        preload="auto"
        loop={loop}
        controls={controls}
        src={`/videos/${src}.mp4?v=${new Date().getTime()}`}
        className="min-w-full min-h-full w-auto h-auto z-[-1] object-cover"
      >
        <source
          src={`/videos/${src}.mp4?v=${new Date().getTime()}`}
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default Video;
