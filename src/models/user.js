const { Model, DataTypes } = require('sequelize');
const validateCpf = require('../utils/validateCpf');

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isCpfValid(value) {
            if (!validateCpf(value)) {
              throw new Error('CPF inválido.');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userType: {
        type: DataTypes.ENUM('common', 'merchant'),
        allowNull: false,
      },
      balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
