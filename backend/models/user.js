const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3},
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  skillLevel: { type: String, enum: ['beginner', 'intermediate', 'expert'], default: 'beginner' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
