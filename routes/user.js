var databaseSingleton = require('../database/database');
var db = new databaseSingleton().sequelize;
var cypher = require('../models/cypher');

//user_id: rb
//token
 module.exports.getIp = function(req, res){
    var password_enc = cypher.encrypt(req.body.password);
    var email_enc = cypher.encrypt(req.body.email);
    var query = `select address from ip inner join users on users.id = ip.user_id where users.email like '${email_enc}' and users.password like '${password_enc}'`;

    db.query(query).spread(function(result, metadata){
        var ip = result ? result: "No IP address found";
        res.json( {ip:ip[0]['address'] });
        return;
    }).catch(function(err){
        res.json({msg: 'email repetido'});
        return; 
    });             
}

module.exports.getCredentials = function(req,res){
    if(req.body.palavra_cabalistica != 'fodasseocaralhotodo'){
        res.json({status: 'reprovado'});
        return;
    }
    var email_enc = cypher.encrypt(req.body.email);
    var password_enc = cypher.encrypt(req.body.password);
    res.json({email_enc,password_enc});
}

module.exports.cadastro = function(req, res){

    var pwd = req.body.senha;  
    var confirm = req.body.confirmacao;  
    if(pwd !== confirm)
    {
        res.json({msg: 'erro na confirmacao da senha'});
        return;           
    }

    var password_enc = cypher.encrypt(req.body.senha);    
    var email_enc =  cypher.encrypt(req.body.email);

    var query = `select * from users where email like '${email_enc}'`;

    db.query(query).spread(function(result, metadata){
        if(result.length>0)
        {
            res.json({msg: 'email repetido'});
            return;             
        }
        var query = `insert into users (email, password) values ('${email_enc}' ,'${password_enc}')`;

        db.query(query).spread(function(result, metadata){
            res.json( {msg: 'sucesso'});
            return; 
        }).catch(function(err){
            res.json( {msg: 'erro'});
            return; 
        });
    }).catch(function(err){
        res.json({msg: 'email repetido'});
        return; 
    });             
}