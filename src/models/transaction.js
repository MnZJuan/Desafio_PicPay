const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Transaction extends Model {}

  Transaction.init(
    {
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      payerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      payeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );

  return Transaction;
};
