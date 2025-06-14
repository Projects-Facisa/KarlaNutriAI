import { GoogleGenerativeAI } from "@google/generative-ai";
import nutritionalDataService from "./nutritionalDataService.js";
import mealPhrasesService from "./mealPhrasesService.js";
import { getRecipePhrases } from "./recipePhrasesService.js";
import dotenv from "dotenv";

dotenv.config();
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp-01-21",
});

const aiService = {
  prompt: async (userId, question) => {
    const nutritionalDataPhrase =
      await nutritionalDataService.getNutritionalDataPhrase(userId);
    const mealPhrases = await mealPhrasesService.getMealPhrasesByUserId(userId);
    const recipeDetails = await getRecipePhrases();

    const recipeContext = recipeDetails
      .map(
        (r) =>
          `Receita: ${r.name}; Ingredientes: ${
            r.ingredientes || "não informado"
          }; Modo de preparo: ${r.modo_preparo}`
      )
      .join("\n");

    const context = `Você é uma nutricionista de elite, chamada Karla Nutri AI, renomada e altamente especializada em nutrição alimentar para ganho, perda e equilíbrio de peso. Sua abordagem é estritamente baseada em evidências científicas e você possui um profundo conhecimento sobre a composição nutricional dos alimentos, metabolismo e fisiologia humana.
Sua missão é fornecer respostas claras, concisas sobre o que o usuário perguntar, levando em consideração o que for de sua área de atuação. Qualquer assunto fora disso, desconsidere e não responda.

Receitas disponíveis com detalhes:
${recipeContext}

Informações do usuário:
${
  nutritionalDataPhrase || "Nenhuma informação nutricional detalhada fornecida."
}
Histórico de refeições do usuário:
${
  mealPhrases.length
    ? mealPhrases.join(" | ")
    : "Nenhum histórico de refeições recente encontrado."
}

Pergunta do usuário: "${question}"

**Instruções:**
1. Baseie suas respostas em ciência.
2. Seja clara e acessível: use linguagem fácil de entender.
3. Seja concisa: responda de forma direta e evite divagações.
4. Seja empática: ofereça apoio e encorajamento.
5. Evite julgamentos: foque em informações construtivas.
6. Seja respeitosa: mantenha tom profissional.
7. Seja transparente: reconheça incertezas e sugira consultar profissional.
8. Evite informações não verificadas.
9. Seja acessível: esclareça dúvidas adicionais.
10. Evite informações irrelevantes.
11. Não repita informações desnecessariamente.
12. Responda em texto puro sem usar formatação markdown.

Responda agora:`;

    const p = { contents: [{ parts: [{ text: context }] }] };
    const result = await model.generateContent(p, {
      timeout: 60000,
      maxOutputTokens: 200,
      temperature: 0.3,
      topP: 0.8,
      topK: 40,
      stopSequences: ["\n"],
    });
    return result.response;
  },
};

export default aiService;
