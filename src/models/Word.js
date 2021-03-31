const mongoose = require('mongoose');
const { Schema } = mongoose;

const Word = new Schema({
  title: String,
  created_at: Date
});

module.exports = mongoose.model('Word', Word);
