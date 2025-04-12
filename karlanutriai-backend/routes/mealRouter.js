import express from "express";
import MealController from "../controllers/mealController.js";

const router = new express.Router();

router.get("/phrases", MealController.getMealsPhrasesByUserId);
router.get("/:id", MealController.getById);
router.get("", MealController.getAllMealsByUser);
router.post("", MealController.create);
router.put("/:id", MealController.update);
router.delete("/:id", MealController.delete);

export default router