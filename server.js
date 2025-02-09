var express = require('express');
var app = express();
var server = require('http').createServer(app);

var databaseSingleton = require('./database/database');
var db = new databaseSingleton().sequelize;

process.env.SECRET = "BINA SEM AGUA MATANDO ROBOS PEQUENOS";

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//Routs
var user = require('./routes/user');

// Start the app by listening on the default Heroku port
var porta = process.env.PORT ? process.env.PORT: 3000;
db.sync().then(function(){
  server.listen(porta,()=>{
    console.log('listening to port:' + porta);
  });	  
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/get-ip', user.getIp);

app.post('/set-ip', user.setIp);

//app.get('/cadastro', user.cadastro);

//app.get('/treta', user.getCredentials);