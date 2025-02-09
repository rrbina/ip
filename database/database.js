//https://www.npmjs.com/package/create-singleton
//http://docs.sequelizejs.com/manual/installation/getting-started.html

var createSingleton = require('create-singleton');
 
function Singleton() {
    var Sequelize = require('sequelize');

    this.sequelize =  new Sequelize({
    dialect: 'sqlite',
        storage: './database/sqlite.db'
    })
} 
 
module.exports = createSingleton(Singleton);

