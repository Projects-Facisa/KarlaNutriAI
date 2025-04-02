import { useContext } from "react";
import { LoadingContext } from "./LoadingContext";

export const useLoader = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};
