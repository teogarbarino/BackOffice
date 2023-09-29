const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Daily = mongoose.model('Daily', dailySchema);

module.exports = Daily;