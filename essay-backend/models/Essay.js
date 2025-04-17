const mongoose = require('mongoose');

const EssaySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  sentiment: {
    type: String,
    enum: ['积极', '中性', '消极'],
    default: '中性'
  },
  suggestions: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Essay', EssaySchema);
