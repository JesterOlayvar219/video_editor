"use client";

import { createContext, useContext, useReducer } from "react";

const ProjectContext = createContext();

// Define initial state
const initialState = {
  textElements: [], // Array to store text overlays
  currentTime: 0, // Current video playback time
  duration: 30 * 30, // 30 seconds at 30 fps
  isPlaying: false, // Video playback state
};

// Define the reducer function for state updates
const projectReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TEXT":
      return {
        ...state,
        textElements: [...state.textElements, action.payload],
      };
    case "UPDATE_TEXT":
      return {
        ...state,
        textElements: state.textElements.map((element) =>
          element.id === action.payload.id ? action.payload : text
        ),
      };
    case "DELETE_TEXT":
      return {
        ...state,
        textElements: state.textElements.filter(
          (element) => element.id !== action.payload
        ),
      };
    case "SET_CURRENT_TIME":
      return {
        ...state,
        currentTime: action.payload,
      };
    case "SET_IS_PLAYING":
      return {
        ...state,
        isPlaying: action.payload,
      };
    default:
      return state;
  }
};

// Create Provider component to wrap around the app
export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);
  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook to use the project context
export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
