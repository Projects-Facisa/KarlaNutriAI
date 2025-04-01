import messageService from "../services/messageService.js";

class MessageController {
    async create(req, res) {
        try {
            const { chatId } = req.params;
            const { author, content } = req.body;

            const newMessage = await messageService.createMessage(chatId, { author, content });
            return res.status(201).json(newMessage);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async get(req, res) {
        try {
            const messages = await messageService.getAllMessagesWithoutChatId();
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new MessageController();
