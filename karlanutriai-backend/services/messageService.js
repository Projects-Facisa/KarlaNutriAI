import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

class MessageService {
    async createMessage(chatId, { author, content }) {
        const newMessage = new Message({ author, content });
        await newMessage.save();

        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw new Error("Chat não encontrado.");
        }

        await Chat.findByIdAndUpdate(
            chatId,
            { $push: { messages: newMessage._id }, updateAt: Date.now() },
            { new: true }
        ).populate("messages");
    
        return newMessage;
    }
    

    async updateMessage(messageId, newContent) {
        const message = await Message.findById(messageId);
        if (!message) {
            throw new Error("Mensagem não encontrada.");
        }

        message.content = newContent;
        await message.save();
        return message;
    }

    async deleteMessage(messageId) {

        const message = Message.findById(messageId);
        if(!message) {
            throw new Error("Não existe mensagem com este ID!")
        }

        return "mensagem deletada com sucesso: " + message;
    }
}

export default new MessageService();
