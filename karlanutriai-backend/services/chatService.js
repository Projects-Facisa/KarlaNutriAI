import Chat from '../models/Chat.js';
import messageService from './messageService.js';


class chatService {

    async createChat(data) {
        const chat = new Chat(data);
        return await chat.save();
    }

    async getChatById(id) {
        const chat = await Chat.findById(id).populate('messages');
        return chat;
    }

    async getAllChatsByUserId(userId) {
        const chats = await Chat.find({ userId: userId });
        return chats;
    }

    async updateChat(data, chatId) {
        const updateAt = Date.now();
        data.updateAt = updateAt;
        return await Chat.findByIdAndUpdate(chatId, data, { new: true })
    }

    async deleteChat(chatId) {
        const hasChat = await Chat.findById(chatId);
        if (!hasChat) {
            throw new Error('Chat nao encontrado!');
        }
        // Deletar todas as mensagens associadas ao chat antes de deletar o chat
        await messageService.deleteAllMessagesByChatId(chatId);
        return await Chat.findByIdAndDelete(chatId);
    }

    async addMessageToChat(chatId, messageId) {
        await Chat.updateOne(
            { _id: chatId },
            { 
                $push: {messages: messageId },
                $set: {updateAt: Date.now()} ,
            }, {new: true}
        );
    }
}

export default new chatService();