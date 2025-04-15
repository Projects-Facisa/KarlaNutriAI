import MealPhrases from "../models/MealPhrases.js";

class mealPhrasesService {
    async addMealPhrase(userId, phrase) {
        try {
            return await MealPhrases.findOneAndUpdate(
            { userId },
            { 
                $push: { 
                phrases: {
                    $each: [phrase],
                    $position: 0  // Adiciona no início do array
                } 
                }
            },
            { 
                upsert: true,
                new: true,
                setDefaultsOnInsert: true 
            }
            );
        } catch (error) {
            console.error("Erro ao adicionar meal phrase:", error);
            throw new Error("Falha ao atualizar meal phrases");
        }
    }
    
    async getMealPhrasesByUserId(userId) {
        const doc = await MealPhrases.findOne({ userId });
        return doc ? doc.phrases : [];
    }
}

export default new mealPhrasesService();