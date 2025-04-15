import aiService from '../services/aiService.js';

class aiController {
    async promptWithGemini(req, res) {
        const { userData } = req.headers;
        const prompt = req.body.prompt;
        const result = await aiService.prompt(userData.id , prompt);
        return res.status(200).json(result.text());
    }

}

export default new aiController();