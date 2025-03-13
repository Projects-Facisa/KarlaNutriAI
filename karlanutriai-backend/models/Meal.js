import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Cafe da manha', 'Almoco', 'Lanche', 'Janta'],
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const meal = mongoose.model('Meal', mealSchema);

export default meal;