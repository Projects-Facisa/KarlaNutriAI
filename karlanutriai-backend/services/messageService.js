import chatService from "./chatService.js";
import Message from "../models/Message.js";

class MessageService {
    async createMessage(chatId, { author, content }) {
        const hasChat = await chatService.getChatById(chatId);
        if (!hasChat) {
            throw new Error("Chat não encontrado.");
        }
        
        const newMessage = new Message({ author, content, chatId: chatId });
        await newMessage.save();

        await chatService.addMessageToChat(chatId, newMessage._id);
    
        return newMessage;
    }
    
    //GET DE MESSAGES PARA TESTAR SE HA ALGUMA MENSAGEM NO BANCO
    async getAllMessagesWithoutChatId() {
        const messages = await Message.find();
        if (!messages) {
            throw new Error("Nenhuma mensagem encontrada.");
        }
        return messages;
    }

    async deleteAllMessagesByChatId(chatId) {
        try {
            await Message.deleteMany({ chatId: chatId });
        } catch (err) {
            throw new Error("Erro ao deletar mensagens: " + err.message);
        }
    }
    
}

export default new MessageService();
