const models = require('../models');

const { Message } = models;

const getMessages = async (req, res) => {
  try {
    // give me every message in the database
    const messages = Message.find({}).lean().exec();
    return res.json({ messages });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

const makeMessage = (req, res) => {
  if (!req.body.message) {
    return res.status(400).json({ error: 'A message is required!' });
  }
  const cleanedMessage = `${req.body.message.trim()}`;
  try {
    const message = Message.create({
      message: cleanedMessage,
      owner: req.session.account._id,
    });
    message.save();
    return res.status(201).json({ message });
    // emit socket event
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  getMessages,
  sendMessage: makeMessage,
};
