"use client";

import { Player } from "@remotion/player";
import { useCallback, useRef } from "react";
import { useProject } from "../context/ProjectContext";
import { DndContext } from "@dnd-kit/core";
import TextOverlay from "./TextOverlay";

export default function VideoPreview() {
  const { state, dispatch } = useProject();
  const playerRef = useRef();

  const handleTimeUpdate = useCallback(
    (time) => {
      requestAnimationFrame(() => {
        dispatch({ type: "SET_CURRENT_TIME", payload: time });
      });
    },
    [dispatch]
  );

  const handleDragEnd = useCallback(
    (event) => {
      const { active, delta } = event;
      const element = state.textElements.find((el) => el.id === active.id);

      if (element) {
        dispatch({
          type: "UPDATE_TEXT",
          payload: {
            ...element,
            position: {
              x: element.position.x + delta.x,
              y: element.position.y + delta.y,
            },
          },
        });
      }
    },
    [state.textElements, dispatch]
  );

  return (
    <div className="relative w-full aspect-video bg-black">
      <DndContext onDragEnd={handleDragEnd}>
        <Player
          ref={playerRef}
          component={() => (
            <div className="relative w-full h-full">
              {/* Make sure you have a video file in your public folder */}
              <video
                src="/sample-video.mp4"
                className="w-full h-full object-contain"
              />
              {/* This is where TextOverlay components are rendered */}
              {state.textElements.map((element) => (
                <TextOverlay
                  key={element.id}
                  element={element}
                  currentTime={state.currentTime}
                />
              ))}
            </div>
          )}
          durationInFrames={state.duration}
          fps={30}
          compositionWidth={1920}
          compositionHeight={1080}
          playing={state.isPlaying}
          onFrame={handleTimeUpdate}
          controls
        />
      </DndContext>
    </div>
  );
}
