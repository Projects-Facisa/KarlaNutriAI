import { useState } from "react";

export interface Recipe {
  id: number;
  receita: string;
  ingredientes?: string;
  modo_preparo: string;
  link_imagem: string;
  tipo: string;
}

const BASE = "https://api-receitas-pi.vercel.app/receitas";

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async (): Promise<Recipe[]> => {
    setLoading(true);
    const res = await fetch(`${BASE}/todas`);
    const data: Recipe[] = await res.json();
    setLoading(false);
    setRecipes(data);
    return data;
  };

  const search = async (query: string) => {
    setLoading(true);
    const res = await fetch(`${BASE}/todas`);
    const all: Recipe[] = await res.json();
    const filtered = all.filter(
      (r) =>
        r.receita.toLowerCase().includes(query.toLowerCase()) ||
        (r.ingredientes ?? "").toLowerCase().includes(query.toLowerCase())
    );
    setRecipes(filtered);
    setLoading(false);
  };

  return { recipes, loading, search, fetchAll };
}
