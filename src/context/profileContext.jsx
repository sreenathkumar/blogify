import { createContext, useReducer } from "react";
import { initialState, profileReducer } from "@reducers/profile.reducers";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
