const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  file_download_url: { type: String, required: true },
  category: { type: String, required: true }, 
  created_at: { type: Date, default: Date.now },
  downloads: { type: Number, default: 0 },   // Track the number of downloads
  emails_sent: { type: Number, default: 0 }  // tracks the number of emails
});


module.exports = mongoose.model('File', fileSchema);

