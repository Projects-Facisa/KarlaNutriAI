import nutritionalDataService from "../services/nutritionalDataService";

class nutritionalDataController {

    async createNutritionalData (req, res) {
        try {
            const nutritionalData = await nutritionalDataService.createNutritionalData(req.body)
            res.status(201).json(nutritionalData);
        }
        catch (error) {
            res.status(400).json({message: "erro ao criar os dados nutricionais | ", error: error.message})
        }
    }

    async getNutritionalDataById(req, res) {
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

    async getNutritionalDataByUserId(req, res) {
        try {
            const { userId } = req.params
            const nutritionalData = await nutritionalDataService.getNutritionalDataByUserId(userId);
            if (!nutritionalData) {
                return res.status(404).json({ message: 'Nao ha dados nutricionais cadastrados para esse usuario' });
            }
            res.status(200).json(nutritionalData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateNutritionalData(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const userId = req.userId; // ID do usuário logado

            const nutritionalData = await nutritionalDataService.updateNutritionalData(id, data, userId);
            if (!nutritionalData) {
                return res.status(404).json({ message: 'Nutritional data not found' });
            }
            res.status(200).json(nutritionalData);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

export default new nutritionalDataController();