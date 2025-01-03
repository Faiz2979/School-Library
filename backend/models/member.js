'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.borrow, {
        foreignKey: 'memberID',
        as: 'borrow'
      });
    }
  }
  member.init({
    memberID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    contact: DataTypes.STRING,
    address: DataTypes.STRING,
    profilePict: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'member',
  });
  return member;
};