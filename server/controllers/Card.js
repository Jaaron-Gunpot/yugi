const models = require('../models');

const { Card } = models;

const saveCard = async (req, res) => {
  const cardData = {
    owner: req.session.account._id,
    name: req.body.name,
    type: req.body.type,
    level: req.body.level,
    attribute: req.body.attribute,
    attack: req.body.attack,
    defense: req.body.defense,
    description: req.body.description,
    cardType: req.body.cardType,
    linkRating: req.body.linkRating,
    linkMarkers: req.body.linkMarkers,
    isPendulum: req.body.isPendulum,
    pendulumScale: req.body.pendulumScale,
    pendulumDescription: req.body.pendulumDescription,
  };

  try {
    const newCard = new Card(cardData);
    await newCard.save();
    return res.json({ message: 'Card saved successfully' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Card already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  }
};

const getCards = async (req, res) => {
  try {
    const foundCards = await Card.find({ owner: req.session.account._id }).lean().exec();
    return res.json({ cards: foundCards });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  saveCard,
  getCards,
};
