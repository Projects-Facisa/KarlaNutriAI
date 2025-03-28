import chatService from "../services/chatService.js";

class ChatController {

    async create(req, res) {
        try {
            const { userData } = req.headers;
            const data = req.body;

            const newChat = {
                userId: userData.id,
                ...data,
            };

            const chat = await chatService.createChat(newChat);
            return res.status(201).json({ chat });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const chat = await chatService.getChatById(id);
            if (!chat) {
                return res.status(404).json({ message: "Chat nao encontrado com esse id" });
            }
            return res.status(200).json(chat);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getAllChats(req, res) {
        try {
            const { userData } = req.headers;
            const chats = await chatService.getAllChatsByUserId(userData.id);
            if (!chats) {
                return res.status(404).json({ message: "O usuario nao possui nenhum chat" });
            }
            return res.status(200).json(chats);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            const { id } = req.params;

            const chat = await chatService.updateChat(data, id);
            if (!chat) {
                return res.status(404).json({ message: "Chat nao encontrado com esse id" });
            }
            return res.status(200).json(chat);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const chat = await chatService.deleteChat(id);
            if (!chat) {
                return res.status(404).json({ message: "Chat nao encontrado com esse id" });
            }
            return res.status(200).json({ message: "Chat deletado com sucesso" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}

export default new ChatController();