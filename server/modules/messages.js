const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chatUsername: {
        type: String,
        required: true
    },
    chatMessage: {
        type: String,
        required: true
    },
    chatRoom: {
        type:String,
        required:true
    },
    socketId: {
        type: String,
        required: true
    }
}, { timestamps: true })


const Message = mongoose.model('Message', messageSchema, 'chatHistory');

module.exports = Message;