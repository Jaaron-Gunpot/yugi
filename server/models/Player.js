const mongoose = require('mongoose');

let PlayerModel = {};

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: Number,
    required: true,
  },
  kills: {
    type: Number,
    required: true,
  },
});

PlayerModel = mongoose.model('Player', playerSchema);
module.exports = PlayerModel;
