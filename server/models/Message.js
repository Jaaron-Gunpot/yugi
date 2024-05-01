const mongoose = require('mongoose');

let MessageModel = {};

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
});

MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;
