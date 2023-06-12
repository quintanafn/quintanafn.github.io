const mongoose = require('mongoose');

// Defina o esquema do modelo de dados
const ipSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
    unique: true,
  },
  selectedNumber: {
    type: Number,
    required: true,
    unique: true,
  },
});

// Crie o modelo com base no esquema
const IP = mongoose.model('IP', ipSchema);

// Exporte o modelo
module.exports = IP;
