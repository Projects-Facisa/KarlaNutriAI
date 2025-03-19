import User from "../models/User.js";
import {isEmail, verifyPassword} from "../globalFunctions.js";
import bcrypt from "bcrypt";
import NutritionalDataService from "./nutritionalDataService.js";

class UserService {
    async createUser({name, email, password, tel}) {

        if (!name || !email || !password || !tel) {
            throw new Error('Todos os campos sao necessarios');
        }

        // COMENTADO ENQUANTO ESTAMOS EM FASE DE TESTES,
        // PARA NAO PRECISAR CRIAR UMA SENHA COM PADROES
        // if (verifyPassword(senha)) {
        //     throw new Error('Senha invalida');
        // }

        if (!isEmail(email)) {
            throw new Error('Email invalido');
        }

        const existingEmailUser = await User.findOne({email});
        const existingTelUser = await User.findOne({tel});

        if (existingEmailUser || existingTelUser) {
            throw new Error(
                existingEmailUser && existingTelUser ? 'Email and telefone ja existem' :
                    existingEmailUser ? 'Email em uso' : 'Telefone em uso'
            );
        }

        const user = new User({
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
            tel: tel.trim()
        });

        // Salva o usuário no banco de dados
        const savedUser = await user.save();
        savedUser.password = undefined; // Remove a senha do objeto de retorno

        return savedUser;
    }

    async findUserByEmail(email) {
        return await User.findOne({email});
    }

    async findUserById(userId){
        const user = await User.findById(userId).populate("nutritionalDataId");

        return user ? user : "não existe usuário para esse id"
    }

    async hasNutritionalData(userId){
        const user = await User.findById(userId)

        return user.nutritionalDataId ? true : false
    }

    async updateUser(userId, {name, email, password, tel}) {
        if (!name && !email && !password && !tel) {
            throw new Error("Pelo menos um campo deve ser fornecido para atualização.");
        }

        // COMENTADO ENQUANTO ESTAMOS EM FASE DE TESTES,
        // PARA NAO PRECISAR CRIAR UMA SENHA COM PADROES
        // if (verifyPassword(senha)) {
        //     throw new Error('Senha invalida');
        // }

        if (email && !isEmail(email)) {
            throw new Error('Email invalido');
        }

        let existingEmailUser = null;
        let existingTelUser = null;

        if (email) {
            existingEmailUser = await User.findOne({ email });
        }

        if (tel) {
            existingTelUser = await User.findOne({ tel });
        }

        if (
            (existingEmailUser && String(existingEmailUser._id) !== userId) ||
            (existingTelUser && String(existingTelUser._id) !== userId)
        ) {
            throw new Error(
                (existingEmailUser && existingTelUser) ? 'Email e telefone já existem' :
                    existingEmailUser ? 'Email em uso' :
                        existingTelUser ? 'Telefone em uso' : ''
            );
        }


        const salt = await bcrypt.genSalt(10);
        const updateData = {};

        if (name) {
            updateData.name = name.trim();
        }
        if (email) {
            updateData.email = email.trim();
        }
        if (password) {
            updateData.password = await bcrypt.hash(password.trim(), salt);
        }
        if (tel) {
            updateData.tel = tel.trim();
        }

        const user = await User.findByIdAndUpdate(userId, updateData, {new: true});
        user.password = undefined;
        return user;
    }

    async deleteUser(userId) {
        await User.findByIdAndDelete(userId);
        const nutriData = await NutritionalDataService.deleteNutritionalData(userId);
        return {message: 'Usuário deletado com sucesso', nutritionalData: nutriData};
    }
}

export default new UserService();