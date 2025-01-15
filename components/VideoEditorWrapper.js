"use client";

import { useEffect, useState } from "react";
import { ProjectProvider } from "../context/ProjectContext";
import VideoPreview from "./VideoPreview";
import Timeline from "./Timeline";

export default function VideoEditorWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null on server-side
  }

  return (
    <ProjectProvider>
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Video Editor</h1>
        <VideoPreview />
        <Timeline />
      </div>
    </ProjectProvider>
  );
}
