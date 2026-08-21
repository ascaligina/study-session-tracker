const mongoose = require('mongoose');

const sessioneStudioSchema = new mongoose.Schema({
  materia: { type: String, required: true },
  durataMinuti: { type: Number, required: true },
  data: { type: Date, required: true, default: Date.now },
  tipo: { type: String, enum: ['Libera', 'Pomodoro'], default: 'Libera' },
  nota: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('SessioneStudio', sessioneStudioSchema);