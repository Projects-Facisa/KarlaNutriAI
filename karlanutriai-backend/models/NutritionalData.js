import mongoose from "mongoose";

const nutritionalDataSchema = new mongoose.Schema({
    dataNascimento: {
        type: Data,
        required: true,
    },
    altura: {
        type: Number,
        required: true,
    },
    peso: {
        type: Number,
        required: true,
    },
    alergia: {
        type: [String],
        default: ["Sem alergias alimentares"],
    },
    profissao: {
        type: String,
        required: false,
    },
    percentualGordura: {
        type: String,
        enum: [],
        required: true,
    },
    taxaMetabolica: {
        type: String,
        enum: [],
        required: true,
    },
    meta: {
        type: String,
        enum: [],
        required: true,
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const nutritionalData = mongoose.model('NutritionalData', nutritionalDataSchema);

export default nutritionalData;