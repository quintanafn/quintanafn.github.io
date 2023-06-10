// Importe as dependências
const express = require('express');
const mongoose = require('mongoose');

// Crie uma instância do servidor Express
const app = express();

// Defina a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Defina a URL de conexão com o banco de dados MongoDB
const MONGODB_URI = 'mongodb+srv://joaoquintana:<19126247-Joao>@cluster0.mms1wdd.mongodb.net/?retryWrites=true&w=majority';

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
app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

// Outras rotas e lógica do servidor podem ser adicionadas aqui

// Inicie o servidor Express
app.listen(PORT, () => {
  console.log(`Servidor Express rodando na porta ${PORT}`);
});