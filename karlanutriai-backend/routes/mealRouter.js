import express from "express";
import MealController from "../controllers/mealController.js"
import {tokenValidate} from "../middleware/Auth.js";
const router = new express.Router();

router.get("/:id",tokenValidate, MealController.getById);
router.get("/", tokenValidate, MealController.getAllMealsByUser);
router.post("/", tokenValidate, MealController.create);
router.put("/:id", tokenValidate, MealController.update);
router.delete("/:id",tokenValidate, MealController.delete);

export default router