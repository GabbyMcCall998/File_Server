const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  download_url: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  admin_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('File', fileSchema);
