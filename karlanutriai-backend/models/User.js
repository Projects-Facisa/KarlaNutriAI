import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
    },
    senha: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
        unique: true,
    },
});

const User = mongoose.model("User", userSchema);

export default User;