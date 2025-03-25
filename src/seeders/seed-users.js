module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        fullName: 'João Silva',
        cpf: '12345678909', // CPF válido
        email: 'joao.silva@example.com',
        password: 'senha123',
        userType: 'common',
        balance: 500.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: 'Maria Oliveira',
        cpf: '98765432100', // CPF válido
        email: 'maria.oliveira@example.com',
        password: 'senha123',
        userType: 'common',
        balance: 300.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: 'Loja ABC',
        cpf: '11122233344', // CPF válido
        email: 'loja.abc@example.com',
        password: 'senha123',
        userType: 'merchant',
        balance: 0.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
