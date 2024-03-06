import { authReducer, initialState } from "@reducers/auth.reducers";
import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, dispatchAuth] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ auth, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
