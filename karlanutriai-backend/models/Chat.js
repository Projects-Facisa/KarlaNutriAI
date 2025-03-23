import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    }],
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;