import User from "../models/User.js";
import { isEmail, verifyPassword } from "../GlobalFunctions.js";
import bcrypt from "bcrypt";

class UserService {
    async createUser({ name, email, password, tel }) {
        try {
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

            const existingEmailUser = await User.findOne({ email });
            const existingTelUser = await User.findOne({ tel });

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
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findUserByEmail(email) {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
        }
    }

    async updateUser(userId, { name, email, password, tel }) {
        try {
            if (!name && !email && !password && !tel) {
                throw new Error("Pelo menos um campo deve ser fornecido para atualização.");
            }

            // COMENTADO ENQUANTO ESTAMOS EM FASE DE TESTES,
            // PARA NAO PRECISAR CRIAR UMA SENHA COM PADROES
            // if (verifyPassword(senha)) {
            //     throw new Error('Senha invalida');
            // }

            if (!isEmail(email)) {
                throw new Error('Email invalido');
            }

            const existingEmailUser = await User.findOne({ email });
            const existingTelUser = await User.findOne({ tel });
            if (String(existingEmailUser._id) !== userId || String(existingTelUser._id) !== userId) {
                throw new Error(
                    existingEmailUser && existingTelUser ? 'Email and telefone ja existem' :
                        existingEmailUser ? 'Email em uso' : 'Telefone em uso'
                );
            }

            const salt = await bcrypt.genSalt(10);
            const updateData ={
                name: name.trim(),
                email: email.trim(),
                password: await bcrypt.hash(password.trim(), salt),
                tel: tel.trim()
            };

            const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
            user.password = undefined;
            return user;
        } catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error.message}`);
        }
    }

    async deleteUser(userId) {
        try {
            await User.findByIdAndDelete(userId);
            return { message: 'Usuário deletado com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error.message}`);
        }
    }
}

export default new UserService();