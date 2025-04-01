import Chat from '../models/Chat.js';


class chatService {

    async createChat(data) {
        const chat = new Chat(data);
        return await chat.save();
    }

    async getChatById(id) {
        const chat = await Chat.findById(id).populate('messages');
        if (!chat) {
            throw new Error('Nao ha um chat com este ID!');
        }
        return chat;
    }

    async getAllChatsByUserId(userId) {
        const chats = await Chat.find({ userId: userId });
        if (chats.length === 0) {
            throw new Error('Nao ha nenhum chat cadastrado para esse usuario!');
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