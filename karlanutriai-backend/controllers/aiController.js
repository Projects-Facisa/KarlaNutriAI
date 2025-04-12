import aiService from '../services/aiService.js';

class aiController {
    async promptWithGemini(req, res) {
        const result = await aiService.prompt(req.body.prompt);
        return res.status(200).json(result.text());
    }

}

export default new aiController();