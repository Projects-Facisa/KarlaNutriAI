import fetch from "node-fetch";

let cache = { timestamp: 0, recipes: [] };

export async function loadRecipeDetails() {
  if (Date.now() - cache.timestamp < 1000 * 60 * 10 && cache.recipes.length) {
    return cache.recipes;
  }
  const res = await fetch("https://api-receitas-pi.vercel.app/receitas/todas");
  if (!res.ok) throw new Error(`Erro ao carregar catálogo: ${res.statusText}`);
  const data = await res.json();
  cache = { timestamp: Date.now(), recipes: data };
  return data;
}

export async function getRecipePhrases() {
  const recipes = await loadRecipeDetails();
  return recipes.map((r) => ({
    name: r.receita,
    ingredientes: r.ingredientes || "",
    modo_preparo: r.modo_preparo,
  }));
}
