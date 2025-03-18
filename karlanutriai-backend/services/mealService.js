import Meal from '../models/Meal.js';
import User from '../models/User.js';

class mealService {


    async createMeal(data) {
        const user = await User.findById(data.userId);
        if (!user) {
            throw new Error('A refeicao precisa pertencer a um usuario existente');
        }

        const meal = Meal(data);
        return await meal.save();
    }

    async getMealById(id) {
        const meal = await Meal.findById(id);
        if (!meal) {
            return 'Nao ha uma refeicao com este ID!';
        }
        return meal;
    }

    async getAllMealsByUserId(userId) {
        const meals = await Meal.find({ userId: userId });
        if (meals.length === 0) {
            return 'Nao ha refeicoes para este usuario!';
        }
        return meals;
    }

    async updateMeal (data, mealId) {

        const meal = await this.getMealById(mealId)
        if (!meal) {
            return 'Nao ha uma refeicao com este ID!';
        }

        return await Meal.findByIdAndUpdate(meal._id, data, { new: true })
    }

    async deleteMeal(id) {
        const meal = await this.getMealById(id)
        if (!meal) {
            return 'Nao ha uma refeicao com este ID!';
        }

        return await Meal.findByIdAndDelete(meal._id);
    
    }
}

export default new mealService();

