const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  file_id: { type: Schema.Types.ObjectId, ref: 'File', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient_email: { type: String, required: true },
  sent_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Email', emailSchema);
