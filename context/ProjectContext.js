"use client";

import { createContext, useContext, useReducer } from "react";

const initialState = {
  textElements: [],
  currentTime: 0,
  duration: 30 * 30, // 30 seconds at 30 fps
  isPlaying: false,
};

const ProjectContext = createContext();

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
