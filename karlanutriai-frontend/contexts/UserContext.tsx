import React, { createContext, useState, useContext, useEffect } from "react";
import httpService from "@/app/services/httpServices";

type UserProfile = {
  name: string;
  email: string;
  tel: string;
  nutritionalDataId?: string;
};

type UserContextType = {
  user: UserProfile | null;
  fetchUser: () => Promise<void>;
  fetchNutritionalData: () => Promise<boolean>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const fetchUser = async () => {
    try {
      const response = await httpService.get("/users");
      setUser(response.data.user);
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  const fetchNutritionalData = async (): Promise<boolean> => {
    try {
      const response = await httpService.get("/auths/displayHome");
      return response.data.display;
    } catch (error) {
      console.error("Erro ao buscar dados nutricionais:", error);
      return false;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, fetchUser, fetchNutritionalData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve ser usado dentro de UserProvider");
  }
  return context;
};
