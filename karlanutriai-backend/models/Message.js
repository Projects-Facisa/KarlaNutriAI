import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    sentAt: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;