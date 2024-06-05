const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const downloadSchema = new Schema({
  file_id: { type: Schema.Types.ObjectId, ref: 'File', required: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  downloaded_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Download', downloadSchema);
