// Importe as dependências
const express = require('express');
const mongoose = require('mongoose');

// Crie uma instância do servidor Express
const app = express();

// Defina a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Defina a URL de conexão com o banco de dados MongoDB
const MONGODB_URI = 'mongodb+srv://joaoquintana:19126247-Joao@cluster0.mms1wdd.mongodb.net/rifas?retryWrites=true&w=majority';

// Defina o esquema do modelo de IP
const ipSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    unique: true,
    required: true,
  },
  chosenNumber: {
    type: Number,
    unique: true,
    required: true,
  },
});

// Crie o modelo de IP usando o esquema definido
const IP = mongoose.model('IP', ipSchema);

// Conecte-se ao banco de dados MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado ao MongoDB');
    // Inicie o servidor após a conexão bem-sucedida com o banco de dados
    app.listen(PORT, () => {
      console.log(`Servidor Express rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB', error);
  });

// Permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Defina a rota POST para receber as seleções de números e IPs
app.post('/selecoes', async (req, res) => {
  try {
    const { ipAddress, selectedNumber } = req.body;

    // Verificar se o IP já fez uma seleção anteriormente
    const existingIP = await IP.findOne({ ipAddress });
    if (existingIP) {
      return res.status(400).json({ error: 'Esse IP já fez uma seleção.' });
    }

    // Verificar se o número já foi selecionado
    const existingNumber = await IP.findOne({ selectedNumber });
    if (existingNumber) {
      return res.status(400).json({ error: 'Esse número já foi selecionado.' });
    }

    // Criar uma nova seleção de número e IP
    const newSelection = new IP({ ipAddress, selectedNumber });
    await newSelection.save();

    res.status(201).json({ message: 'Seleção registrada com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar seleção:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao registrar a seleção.' });
  }
});

// Defina a rota GET para obter as seleções existentes
app.get('/selecoes', async (req, res) => {
  try {
    const selecoes = await IP.find({}, 'ipAddress selectedNumber');
    res.status(200).json(selecoes);
  } catch (error) {
    console.error('Erro ao obter as seleções:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter as seleções.' });
  }
});

// Outras rotas e lógica do servidor podem ser adicionadas aqui

// Inicie o servidor Express
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
