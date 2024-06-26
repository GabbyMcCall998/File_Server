const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_verified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

// Indexing email field for faster lookup
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
