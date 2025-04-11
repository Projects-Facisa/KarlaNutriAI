import mongoose from "mongoose";

const nutritionalDataSchema = new mongoose.Schema({
    birthDate: {
        type: Date,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    allergy: {
        type: [String],
        default: ["Sem alergias alimentares"],
    },
    profession: {
        type: String,
        required: false,
    },
    bodyFatPercentage: {
        type: String,
        enum: [
            'Alto percentual de massa muscular',
            'Equilíbrio entre massa muscular e gordura',
            'Alto percentual de gordura corporal',
            'Não sei'
        ],
        required: true,
    },
    metabolicRate: {
        type: String,
        enum: [
            'Metabolismo acelerado (perco peso facilmente)',
            'Metabolismo moderado (peso estável com facilidade)',
            'Metabolismo mais lento (tenho tendência a ganhar peso)'
        ],
        required: true,
    },
    goal: {
        type: String,
        enum: ['Ganhar peso', 'Perder peso', 'Manter peso'],
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    nutritionalDataPhrase: {
        type: String,
    },
});

const nutritionalData = mongoose.model('NutritionalData', nutritionalDataSchema);

export default nutritionalData;