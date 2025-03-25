const { User, Transaction, sequelize } = require('../models');
const axios = require('axios');

module.exports = {
  async transfer(req, res) {
    const { value, payer, payee } = req.body;

    try {
      // Validação inicial
      if (!value || !payer || !payee) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      }

      if (payer === payee) {
        return res.status(400).json({ error: 'O pagador e o recebedor não podem ser o mesmo usuário.' });
      }

      // Buscar usuários no banco de dados
      const payerUser = await User.findByPk(payer);
      const payeeUser = await User.findByPk(payee);

      if (!payerUser || !payeeUser) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      if (payerUser.userType === 'merchant') {
        return res.status(403).json({ error: 'Lojistas não podem realizar transferências.' });
      }

      // Verificar saldo do pagador
      if (payerUser.balance < value) {
        return res.status(400).json({ error: 'Saldo insuficiente.' });
      }

      // Consultar serviço autorizador externo
      let authorizationResponse;
      try {
        authorizationResponse = await axios.get('https://util.devi.tools/api/v2/authorize');
        console.log('Resposta do serviço autorizador:', authorizationResponse.data);

        // Verificar se a autorização foi negada
        if (
          authorizationResponse.data.status === 'fail' &&
          authorizationResponse.data.data.authorization === false
        ) {
          console.error('Autorização negada pelo serviço externo.');
          return res.status(403).json({ error: 'Transferência não autorizada pelo serviço externo.' });
        }
      } catch (error) {
        console.error('Erro ao consultar o serviço autorizador:', {
          message: error.message,
          response: error.response ? error.response.data : null,
          status: error.response ? error.response.status : null,
        });
        return res.status(500).json({ error: 'Erro ao consultar o serviço autorizador.' });
      }

      // Recarregar o saldo do pagador diretamente do banco de dados
      const updatedPayerUser = await User.findByPk(payer);
      if (!updatedPayerUser) {
        return res.status(404).json({ error: 'Usuário pagador não encontrado após atualização.' });
      }

      if (updatedPayerUser.balance < value) {
        return res.status(400).json({ error: 'Saldo insuficiente após validação no banco de dados.' });
      }

      // Realizar a transação como uma operação atômica
      console.log('Iniciando transação...');
      const transaction = await sequelize.transaction(async (t) => {
        // Subtrair o valor da transferência do saldo do pagador
        await updatedPayerUser.update({ balance: updatedPayerUser.balance - Number(value) }, { transaction: t });

        // Somar o valor da transferência ao saldo do recebedor
        await payeeUser.update({ balance: payeeUser.balance + Number(value) }, { transaction: t });

        // Registrar a transação
        return await Transaction.create(
          { value, payerId: payer, payeeId: payee },
          { transaction: t }
        );
      });
      console.log('Transação concluída:', transaction);

      // Enviar notificação ao recebedor
      try {
        const notificationResponse = await axios.post('https://util.devi.tools/api/v1/notify', {
          userId: payee,
          message: `Você recebeu uma transferência de R$${value.toFixed(2)}.`,
        });
        console.log('Resposta do serviço de notificação:', notificationResponse.data);
      } catch (error) {
        console.error('Erro ao enviar notificação:', error.message);
        // Não retornar erro para o cliente, pois a transferência foi concluída
      }

      return res.status(201).json({ message: 'Transferência realizada com sucesso.', transaction });
    } catch (error) {
      console.error('Erro no controlador de transferência:', error); // Log detalhado
      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  },
};