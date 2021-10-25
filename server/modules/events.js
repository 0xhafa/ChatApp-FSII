const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    eventOwner:{
        type: String
    },
    eventDesc:{
        type: String,
        required: true
    },
}, { timestamps: true })

const Event = mongoose.model('Event', eventSchema, 'Events');

module.exports = Event;
