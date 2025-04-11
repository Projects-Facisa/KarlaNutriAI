import NutritionalData from '../models/NutritionalData.js';
import User from '../models/User.js';
import { generateNutritionalDataPhrase } from '../utils/generatePhrases.js';

class nutritionalDataService {

    async create(data) {
        // Verifica se o User existe
        const user = await User.findById(data.userId);
        if (!user) {
            throw new Error('Os dados nutricionais precisam pertencer a um usuario existente');
        }
        // Verifica se o usuario ja possui dados nutricionais cadastrados
        const existingData = await this.getNutritionalDataByUserId(data.userId);
        if (existingData) {
            throw new Error('O usuario ja possui dados nutricionais cadastrados');
        }

        data.nutritionalDataPhrase = generateNutritionalDataPhrase(data);
        const nutritionalData = new NutritionalData(data);
        return await nutritionalData.save();
    }

    async getNutritionalDataById(id) {
        return await NutritionalData.findById(id);
    }

    async getNutritionalDataByUserId(userId) {
        return await NutritionalData.findOne({userId: userId})
    }

    async updateNutritionalData(data, userId) {
        // Verifica se o NutritionalData existe
        const nutritionalData = await this.getNutritionalDataByUserId(userId)
        if (!nutritionalData) {
            return 'Nao ha dados nutricionais para esse usuário';
        }

        // // Verifica se o usuário logado é o dono dos dados | não vai ser necessário por já pesquisar pelo user ID
        // if (nutritionalData.userId.toString() !== userId) {
        //     throw new Error('Acesso negado. Você não tem permissão para excluir dados pertencentes a outro usuario.');
        // }

        return await NutritionalData.findByIdAndUpdate(nutritionalData._id, data, { new: true });
    }

    async deleteNutritionalData(userId) {
        // Verifica se o NutritionalData existe
        const nutritionalData = await this.getNutritionalDataByUserId(userId)
        if (!nutritionalData) {
            return 'Nao ha dados nutricionais para esse usuário';
        }

        // // Verifica se o usuário logado é o dono dos dados | não vai ser necessário por já pesquisar pelo user ID
        // if (nutritionalData.userId.toString() !== userId) {
        //     throw new Error('Acesso negado. Você não tem permissão para excluir dados pertencentes a outro usuario.');
        // }

        return await NutritionalData.findByIdAndDelete(nutritionalData._id);
    }
}

export default new nutritionalDataService();