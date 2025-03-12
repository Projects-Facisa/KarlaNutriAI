import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['Cafe da manha', 'Almoco', 'Lanche', 'Janta'],
        required: true,
    },
    data: {
        type: Date,
        required: true,
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const meal = mongoose.model('Meal', mealSchema);

export default meal;