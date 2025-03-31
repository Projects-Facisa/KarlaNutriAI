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

    async edit(req, res) {
        try {
            const { messageId } = req.params;
            const { newContent } = req.body;

            const updatedMessage = await messageService.updateMessage(messageId, newContent);
            return res.status(200).json(updatedMessage);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { messageId } = req.params;

            const response = await messageService.deleteMessage(messageId);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new MessageController();
