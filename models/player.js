"use strict";
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define("players", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Player;
};
