const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  id: { type: Number, unique: true }, // Auto-incremented ID
  type: { type: String, default: 'admin' },
  unique_id: { type: String, unique: true },
  userurl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Session', SessionSchema);
