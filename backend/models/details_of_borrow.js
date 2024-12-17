'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class details_of_borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    // Relasi ke borrow
    this.belongsTo(models.borrow, { foreignKey: 'borrowID', as: 'borrow' });
    // Relasi ke book
    this.belongsTo(models.book, { foreignKey: 'bookID', as: 'book' });
    }
  }
  details_of_borrow.init({
    detailsID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    borrowID: DataTypes.INTEGER,
    bookID: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'details_of_borrow',
  });
  return details_of_borrow;
};