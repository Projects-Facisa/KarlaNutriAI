import nutritionalDataService from "../services/nutritionalDataService.js";
import NutritionalDataService from "../services/nutritionalDataService.js";

class NutritionalDataController {
    constructor() {
        this.bodyFatPercentageList = [
            'Alto percentual de massa muscular',
            'Equilíbrio entre massa muscular e gordura',
            'Alto percentual de gordura corporal',
            'Não sei'
        ];
        this.metabolicRateList = [
            'Metabolismo acelerado (perco peso facilmente)',
            'Metabolismo moderado (peso estável com facilidade)',
            'Metabolismo mais lento (tenho tendência a ganhar peso)'
        ];
        this.goalList = ['Ganhar peso', 'Perder peso', 'Manter peso'];
    }

    async create (req, res) {
        try {
            const user = req.headers.user

            const {birthDate, height, weight, allergy, profession, bodyFatPercentageIndex, metabolicRateIndex, goalIndex} = req.body

            const data = {
                userId: user,
                birthDate,
                height,
                weight,
                allergy,
                profession,
                bodyFatPercentage: this.bodyFatPercentageList[bodyFatPercentageIndex],
                metabolicRate: this.metabolicRateList[metabolicRateIndex],
                goal: this.goalList[goalIndex],
            }

            const newData = await nutritionalDataService.create(data)

            return res.status(201).json({newData});
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const nutritionalData = await nutritionalDataService.getNutritionalDataById(id);
            if (!nutritionalData) {
                res.status(404).json({ message: 'Dados nutricionais nao encontrados com esse ID' });
            }
            res.status(200).json(nutritionalData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async get(req, res) {
        try {
            const userId = req.headers.user
            const nutritionalData = await nutritionalDataService.getNutritionalDataByUserId(userId);
            if (!nutritionalData) {
                return res.status(404).json({ message: 'Nao ha dados nutricionais cadastrados para esse usuario' });
            }
            res.status(200).json(nutritionalData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            const userId = req.headers.user; // ID do usuário logado

            const nutritionalData = await nutritionalDataService.updateNutritionalData(data, userId);
            if (!nutritionalData) {
                return res.status(404).json({ message: 'Nutritional data not found' });
            }
            res.status(200).json(nutritionalData);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete (req, res) {
        try {
            const user = req.headers.user
            const nutriData = await NutritionalDataService.deleteNutritionalData(user);
            return res.status(201).json(nutriData)
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new NutritionalDataController();
