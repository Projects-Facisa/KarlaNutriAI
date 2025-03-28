import Chat from '../models/Chat.js';


class chatService {

    async createChat(data) {
        const chat = new Chat(data);
        return await chat.save();
    }

    async getChatById(id) {
        const chat = await Chat.findById(id).populate('Message');
        if (!chat) {
            return 'Nao ha um chat com este ID!';
        }
        return chat;
    }

    async getAllChatsByUserId(userId) {
        const chats = await Chat.find({ userId: userId });
        if (chats.length === 0) {
            return 'Nao ha chats para este usuario!';
        }
        return chats;
    }

    async updateChat(data, chatId) {
        const updateAt = Date.now();
        data.updateAt = updateAt;
        return await Chat.findByIdAndUpdate(chatId, data, { new: true })
    }

    async deleteChat(chatId) {
        return await Chat.findByIdAndDelete(chatId);
    }

}

export default new chatService();