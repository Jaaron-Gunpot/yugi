const mongoose = require('mongoose');

let CardModel = {};

const cardSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Monster', 'Spell', 'Trap'],
  },
  level: {
    type: Number,
  },
  attribute: {
    type: String,
    enum: ['dark', 'divine', 'earth', 'fire', 'light', 'water', 'wind'],
  },
  attack: {
    type: Number,
  },
  defense: {
    type: Number,
  },
  description: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  cardType: {
    type: String,
    required: true,
    enum: ['Normal','Effect', 'Fusion', 'Synchro', 'XYZ','Link','Ritual'],
  },
  linkRating: {
    type: Number,
  },
  linkMarkers: {
    type: [String],
    enum: ['Top', 'Bottom', 'Left', 'Right', 'Top-Left', 'Top-Right', 'Bottom-Left', 'Bottom-Right'],
  },
  isPendulum: {
    type: Boolean,
    required: true,
  },
  pendulumScale: {
    type: Number,
  },
  pendulumDescription: {
    type: String,
  },
  isEffect: {
    type: Boolean,
  },
  cardModifier: {
    type: String,
    enum: ['quick-play', 'continuous', 'counter', 'normal', 'field', 'ritual', 'equip'],
  },
});

CardModel = mongoose.model('Card', cardSchema);
module.exports = CardModel;
