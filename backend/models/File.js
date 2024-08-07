const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
  id: { type: Number, unique: true }, 
  title: { type: String, required: true },
  description: { type: String },
  file_download_url: { type: String, required: true },
  category: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  downloads: { type: Number, default: 0 },          
  email_sent_count: { type: Number, default: 0 },    
  file_path: { type: String, required: true } 
});


const File = mongoose.model('File', fileSchema);

module.exports = File;
