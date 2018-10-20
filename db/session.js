'use strict';

module.exports = function (sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    sid: {
      type: DataTypes.STRING(36),
      primaryKey: true
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT
  });

  Session.associate = function(models) {
  };

  return Session;
};
