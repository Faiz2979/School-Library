'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class borrow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.admin, { 
        foreignKey: 'adminID',
        as: 'admin' });
      this.belongsTo(models.member, {
        foreignKey: 'memberID',
        as: 'member' });
        this.hasMany(models.details_of_borrow, {
          foreignKey: 'borrowID',
          as: 'details_of_borrow'  // Pastikan aliasnya adalah 'details_of_borrow'
      });
    }
  }
  borrow.init({
    borrowID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    memberID:DataTypes.INTEGER,
    adminID: DataTypes.INTEGER,
    date_of_borrow: DataTypes.DATE,
    date_of_return: DataTypes.DATE,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'borrow',
  });
  return borrow;
};