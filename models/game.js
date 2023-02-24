'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.belongsTo(models.Profile, { foreignKey: 'owner' } )
    }
  }
  Game.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    GA_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 5,
      }
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Profiles',
        key: 'id',
      }
    },
    photo: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};