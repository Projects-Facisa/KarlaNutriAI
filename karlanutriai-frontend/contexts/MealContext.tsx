import React, { createContext, useState, useContext, useEffect } from "react";
import httpService from "@/app/services/httpServices";

export type MealTypes = "Cafe da manha" | "Almoco" | "Lanche" | "Janta";
export type MealDays =
  | "Segunda-feira"
  | "Terça-feira"
  | "Quarta-feira"
  | "Quinta-feira"
  | "Sexta-feira"
  | "Sabado"
  | "Domingo";

export type Meal = {
  _id?: string;
  type: MealTypes;
  description: string;
  date: Date;
  creationDate: Date;
  updateAt?: Date;
  userId?: string;
};

type MealContextType = {
  meals: Meal[];
  loadMeals: () => Promise<void>;
  addMeal: (
    meal: Omit<Meal, "_id" | "updateAt" | "creationDate">
  ) => Promise<void>;
  updateMeal: (
    id: string,
    meal: Partial<Omit<Meal, "creationDate">>
  ) => Promise<void>;
  deleteMeal: (id: string) => Promise<void>;
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider = ({ children }: { children: React.ReactNode }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const loadMeals = async () => {
    try {
      const response = await httpService.get("meals");
      if (response.status === 200) {
        const data = response.data;
        setMeals(Array.isArray(data) ? data : []);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error("Erro ao carregar meals:", error);
      setMeals([]);
    }
  };

  useEffect(() => {
    loadMeals();
  }, [refreshTrigger]);

  const addMeal = async (
    meal: Omit<Meal, "_id" | "updateAt" | "creationDate">
  ) => {
    const exists = meals.some(
      (m) =>
        m.type === meal.type &&
        new Date(m.date).toDateString() === new Date(meal.date).toDateString()
    );
    if (exists) {
      throw new Error(`Já existe ${meal.type} cadastrado para esse dia!`);
    }
    try {
      const newMeal = { ...meal, creationDate: new Date() }; // Adiciona creationDate automaticamente
      await httpService.post("meals", newMeal);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao adicionar meal:", error);
      throw error;
    }
  };

  const updateMeal = async (
    id: string,
    meal: Partial<Omit<Meal, "creationDate">>
  ) => {
    const conflict = meals.find(
      (m) =>
        m._id !== id &&
        m.type === meal.type &&
        new Date(m.date).toDateString() ===
          new Date(meal.date as Date).toDateString()
    );
    if (conflict) {
      throw new Error(`Já existe ${meal.type} cadastrado para esse dia!`);
    }
    try {
      await httpService.put(`meals/${id}`, meal); // creationDate não é incluído nos dados atualizados
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao atualizar meal:", error);
      throw error;
    }
  };

  const deleteMeal = async (id: string) => {
    try {
      await httpService.delete(`meals/${id}`);
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Erro ao deletar meal:", error);
      throw error;
    }
  };

  return (
    <MealContext.Provider
      value={{ meals, loadMeals, addMeal, updateMeal, deleteMeal }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMealContext = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error("useMealContext must be used within a MealProvider");
  }
  return context;
};
