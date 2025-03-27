import mealService from "../services/mealService.js";

class MealController {
    async create(req, res) {
        try {
            const {userData} = req.headers

            const data = req.body

            const meal = {
                ...data,
                userId: userData.id
            }

            const newMeal = await mealService.createMeal(meal);
            return res.status(201).json({newMeal})
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }

    async getById(req, res) {
        try {
            const mealId = req.params.id;
            const meal = await mealService.getMealById(mealId);
            if (!meal) {
                return res.status(404).json({message: 'Nao existe refeicao com este ID!'});
            }
            return res.status(200).json(meal)
        } catch (error) {
            res.status(500).json({error: error.message});
        }

    }

    async getAllMealsByUser(req, res) {
        try {
            const {userData} = req.headers

            const meals = await mealService.getAllMealsByUserId(userData.id);
            if (meals.length === 0) {
                return res.status(404).json({message: 'Nao ha refeicoes para este usuario!'});
            }
            return res.status(200).json(meals)
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            const mealId = req.params.id;
            const updateAt = Date.now();


            const newMeal = {
                ...data,
                updateAt: updateAt
            }

            const meal = await mealService.updateMeal(newMeal, mealId);
            if (!meal) {
                return res.status(404).json({message: 'Nao existe refeicao com este ID!'});
            }
            res.status(200).json(meal);
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }

    async delete(req, res) {
        try {
            const mealId = req.params.id;

            const meal = await mealService.deleteMeal(mealId);
            return res.status(201).json(meal)
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

export default new MealController();