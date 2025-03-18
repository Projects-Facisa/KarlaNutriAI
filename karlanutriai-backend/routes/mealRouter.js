import express from "express";
const router = new express.Router();
import MealController from "../controllers/mealController.js"
import {tokenValidate} from "../middleware/Auth.js";

router.get("/:id",tokenValidate, MealController.getById);
router.get("/", tokenValidate, MealController.getAllMealsByUser);
router.post("/", tokenValidate, MealController.create);
router.put("/:id", tokenValidate, MealController.update);
router.delete("/:id",tokenValidate, MealController.delete);

export default router