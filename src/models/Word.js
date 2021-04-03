const mongoose = require('mongoose');
const { Schema } = mongoose;

const Word = new Schema({
  text: String,
  created_at: Date
});

module.exports = mongoose.model('Word', Word);
