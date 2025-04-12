import mongoose from "mongoose";

const mealPhrasesSchema = new mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now,
  },
  phrases: [{
    type: String,
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const MealPhrases = mongoose.model("MealPhrases", mealPhrasesSchema);

export default MealPhrases;