// Importe as dependências
const express = require('express');
const mongoose = require('mongoose');

// Crie uma instância do servidor Express
const app = express();

// Defina a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Defina a URL de conexão com o banco de dados MongoDB
const MONGODB_URI = 'mongodb+srv://joaoquintana:<19126247-Joao>@cluster0.mms1wdd.mongodb.net/rifas?retryWrites=true&w=majority';

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

// Defina as rotas e lógica do servidor

// Rota para cadastrar um IP e número escolhido
app.post('/ips', async (req, res) => {
  const { ipAddress, chosenNumber } = req.body;

  try {
    // Verifique se o IP já escolheu um número anteriormente
    const existingIP = await IP.findOne({ ipAddress });
    if (existingIP) {
      return res.status(400).json({ error: 'Esse IP já escolheu um número.' });
    }

    // Crie uma nova instância do IP com os dados recebidos
    const newIP = new IP({ ipAddress, chosenNumber });

    // Salve o IP no banco de dados
    await newIP.save();

    // Envie uma resposta de sucesso
    res.status(201).json({ message: 'IP cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar o IP', error);
    res.status(500).json({ error: 'Ocorreu um erro ao cadastrar o IP.' });
  }
});

// Rota para listar todos os IPs que já escolheram números
app.get('/ips', async (req, res) => {
  try {
    // Obtenha todos os IPs do banco de dados
    const ips = await IP.find();

    // Envie a lista de IPs como resposta
    res.json(ips);
  } catch (error) {
    console.error('Erro ao obter os IPs', error);
    res.status(500).json({ error: 'Ocorreu um erro ao obter os IPs.' });
  }
});

// Inicie o servidor Express
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});
