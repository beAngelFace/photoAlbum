'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
   
    static associate(models) {
      this.belongsTo(models.Album, {
        foreignKey: "albumId"
      })
    }
  }
  Photo.init({
    photo: DataTypes.STRING,
    description: DataTypes.STRING,
    albumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};