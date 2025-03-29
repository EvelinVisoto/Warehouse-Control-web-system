const express = require('express');
const mysql = require("mysql")
const rotas_professores = require("./routes/rotas_professores")
const rotas_movimentacao = require("./routes/rotas_movimentacao")
const Banco = require("./model/Banco.js");
const rotas_mhm = require('./routes/rotas_mhm.js');
const rotas_materiais = require('./routes/rotas_materiais.js');
const rotas_tipo = require("./routes/rotas_tipo.js");
const rotas_posicao = require("./routes/rotas_posicao.js");
const app = express();
app.use(express.json());
app.use(express.static('js'));

//console.log(__dirname + '/ALMOXARIFADO/view/');
app.use('/', express.static(__dirname + '/view/'));
console.log(__dirname)

const porta = 3000;
const host = "0.0.0.0:" + porta;
/*
const banco = mysql.createPool({
    connectionLimit:128,
    host:'localhost',
    user:'root',
    password: '',//adicionar um, pois agr nn tem net para o banco
    database: 'almoxarifado'
})
*/


Banco.getConexao();



//rotas_professores(app,banco)
rotas_professores(app)
rotas_movimentacao(app)
rotas_mhm(app)
rotas_materiais(app)
rotas_tipo(app)
rotas_posicao(app)

app.listen(porta,function(){
    console.log("servidor rodando" + porta);
    console.log(">> " + host);
});