import { useState, useEffect } from "react";

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
    return data;
  };

  const fetchRandomThree = async () => {
    const all = await fetchAll();
    const sample = all.sort(() => 0.5 - Math.random()).slice(0, 3);
    setRecipes(sample);
  };

  const search = async (query: string) => {
    setLoading(true);
    const all = await fetchAll();
    const filtered = all.filter(
      (r) =>
        r.receita.toLowerCase().includes(query.toLowerCase()) ||
        (r.ingredientes ?? "").toLowerCase().includes(query.toLowerCase())
    );
    setRecipes(filtered);
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomThree();
  }, []);

  return { recipes, loading, fetchRandomThree, search, fetchAll };
}