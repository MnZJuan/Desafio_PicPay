const express = require('express');
const path = require('path');
const transferRoutes = require('./routes/transferRoutes');
const { sequelize } = require('./models'); // Importar o Sequelize

const app = express();
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Testar conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
  .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));

// Registrar rotas
app.use('/api', transferRoutes);

// Iniciar o servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
});