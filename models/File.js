const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  filename: { type: String, required: true, unique: true },
  image: { type: String, required: true },
});

module.exports = model('File', schema);
