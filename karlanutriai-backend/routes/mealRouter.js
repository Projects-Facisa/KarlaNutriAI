import express from "express";
const router = new express.Router();
import MealController from "../controllers/mealController.js"
import {tokenValidate} from "../middleware/Auth.js";

router.get("/", MealController.getById);
router.get("/userMeals", tokenValidate, MealController.getAllMealsByUser);
router.post("/", tokenValidate, MealController.create);
router.put("/:id", MealController.update);
router.delete("/:id", MealController.delete);

export default router