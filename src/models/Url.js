const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: '365 days',
    },
  },
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
