import { ProfileContext } from "@context/profileContext";
import { useContext } from "react";

export const useProfile = () => {
  return useContext(ProfileContext);
};
