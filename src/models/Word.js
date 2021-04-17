const mongoose = require('mongoose');
const { Schema } = mongoose;

const Word = new Schema({
  text: String,
  created_at: Date,
  learned_at: Date,
  // image_url: String
  image_url: [String]

});

module.exports = mongoose.model('Word', Word)
