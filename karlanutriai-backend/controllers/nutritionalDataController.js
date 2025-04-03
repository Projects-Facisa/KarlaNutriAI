import User from "../models/User.js";
import nutritionalDataService from "../services/nutritionalDataService.js";

class NutritionalDataController {
    async create(req, res) {
        try {
            const {userData} = req.headers;

            const data = req.body;

            const newNutritionalData = {
                userId: userData.id, ...data
            };

            const nutritionalData = await nutritionalDataService.create(newNutritionalData);
            await User.updateOne({_id: {$in: userData.id}}, {$push: {nutritionalDataId: nutritionalData._id}});

            return res.status(201).json({nutritionalData});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }

    async getById(req, res) {
        try {
            const {id} = req.params;
            const nutritionalData = await nutritionalDataService.getNutritionalDataById(id);
            if (!nutritionalData) {
                res.status(404).json({message: 'Dados nutricionais nao encontrados com esse ID'});
            }
            res.status(200).json(nutritionalData);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async get(req, res) {
        try {
            const {userData} = req.headers;
            const nutritionalData = await nutritionalDataService.getNutritionalDataByUserId(userData.id);
            if (!nutritionalData) {
                return res.status(404).json({message: 'Nao ha dados nutricionais cadastrados para esse usuario'});
            }
            res.status(200).json(nutritionalData);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            const {userData} = req.headers;
            const updateAt = Date.now();

            const newData = {
                userId: userData.id, ...data, updateAt: updateAt,
            };

            const nutritionalData = await nutritionalDataService.updateNutritionalData(newData, userData.id);
            if (!nutritionalData) {
                return res.status(404).json({message: 'Nutritional data not found'});
            }
            res.status(200).json(nutritionalData);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async delete(req, res) {
        try {
            const {userData} = req.headers;
            const nutriData = await nutritionalDataService.deleteNutritionalData(userData.id);
            return res.status(200).json(nutriData);
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

export default new NutritionalDataController();
