import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    tel: {
        type: String,
        required: true,
        unique: true,
    },
});

userSchema.pre(`save`, async function(next) {
    if (!this.isModified('senha')) return next();

    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
})

const User = mongoose.model("User", userSchema);

export default User;