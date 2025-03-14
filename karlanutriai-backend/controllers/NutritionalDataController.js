import nutritionalDataService from "../services/nutritionalDataService.js";

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
}

export default new NutritionalDataController();
