import { createContext, useState, ReactNode } from "react";

interface LoadingContextType {
  loading: boolean;
  loadingIsTrue: () => void;
  loadingIsFalse: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const loadingIsTrue = () => {
    setLoading(true);
  };

  const loadingIsFalse = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ loading, loadingIsTrue, loadingIsFalse }}>
      {children}
    </LoadingContext.Provider>
  );
};
