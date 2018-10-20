var db = require('../db'); 
var forEachAsync = require('foreachasync').forEachAsync;

forEachAsync(Object.keys(db),function (modelName) {
  if (isModel(modelName)) {
    return db[modelName].sync();
  }
  return false;
});

function isModel(key) {
  return !(['sequelize','Sequelize'].includes(key));
}
