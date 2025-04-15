import {GoogleGenerativeAI} from "@google/generative-ai"
import nutritionalDataService from "./nutritionalDataService.js"
import mealPhrasesService from "./mealPhrasesService.js"
import dotenv from "dotenv"
dotenv.config()

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAi.getGenerativeModel({
    model: "gemini-2.0-flash-thinking-exp-01-21",
});

const aiService = {
    prompt: async (userId, question) => {
        const data = await aiService.preparePromptData(userId)

        const { nutritionalDataPhrase, mealPhrases } = data

        const context = `A partir de agora você é Karla Nutri AI, nutricionista focada em ganho, perda e equilíbrio de massa. Considere: ${nutritionalDataPhrase} e ${mealPhrases}. Responda: ${question}`;
  
        const p = {
            "contents": [
                {
                    "parts": [
                        { "text": context }
                    ]
                }
            ]
        }
        const result = await model.generateContent(p,  {timeout: 60000})
        return result.response
    },

    preparePromptData: async (userId) => {
        try {
            const nutritionalDataPhrase = await nutritionalDataService.getNutritionalDataPhrase(userId);
            const mealPhrases = await mealPhrasesService.getMealPhrasesByUserId(userId);

            return {
                nutritionalDataPhrase,
                mealPhrases
            };

        } catch (error) {
            return error
        }
    }
}

export default aiService;