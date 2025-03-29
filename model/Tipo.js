const Banco = require("../model/Banco");
const Movimentacao = require("./Movimentacao")
const Professor = require("../model/Professor")
const Posicao = require ("../model/Posicao")

module.exports = class Tipo {

    constructor() {
        this._idTipoMovimentacao = null;
        this._tipoEntrada = null;
        this._descricao = null;

        
    }
    async create() {
        const operacaoAssincrona = new Promise((resolve, reject) => {

            const idTipoMovimentacao = this.idTipoMovimentacao;
            const tipo = this.tipoEntrada;
            const descricao = this.descricao;

            const parametros = [idTipoMovimentacao, tipo, descricao];
            let sql = "INSERT INTO `almoxarifado`.`tipomovimentacao` (`idTipoMovimentacao`, `tipoEntrada`, `descricao`) VALUES (?, ?, ?);";
           
            Banco.getConexao().query(sql, parametros, function (error, result) {
                if (error) {
                    reject(error);
                    console.log("SQL" + sql)
                } else {
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }
    async read() {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const idTipoMovimentacao = this.idTipoMovimentacao;
            
            
            let parametros = [idTipoMovimentacao];
             let sql = "";
            if (idTipoMovimentacao == null) {
                   sql = "SELECT * FROM tipoMovimentacao order by tipo";
            } else {
                sql = "SELECT * FROM tipoMovimentacao where idTipoMovimentacao=?";
            }
            Banco.getConexao().query(sql, parametros, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }


    async update() {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const idTipoMovimentacao = this.idTipoMovimentacao;
            const tipo = this.tipoEntrada;
            const descricao = this.descricao;

            const parametros = [tipo, descricao, idTipoMovimentacao];
            let sql = "update tipoMovimentacao set tipoEntrada=? , descricao=? where idTipoMovimentacao= ?";
            Banco.getConexao().query(sql, parametros, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }


    async delete() {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const idTipoMovimentacao = this.idTipoMovimentacao;
            let parametros = [idTipoMovimentacao];
           
            let sql = "delete from tipoMovimentacao where idTipoMovimentacao=?";
             Banco.getConexao().query(sql, parametros, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }


    /*relacionar a foreing key
        
    getRegistroProfessor(){
        return this._funcionario_mov.getRegistro_prof();
    }
    */

    get idTipoMovimentacao() {
        return this._idTipoMovimentacao;
    }
    set idTipoMovimentacao(in_idTipoMovimentacao) {
        this._idTipoMovimentacao = in_idTipoMovimentacao;
    }

    get tipoEntrada() {
        return this._tipoEntrada;
    }
    set tipoEntrada(in_tipoEntrada) {
        this._tipoEntrada = in_tipoEntrada;
    }
    get descricao() {
        return this._descricao;
    }
    set descricao(in_descricao) {
        this._descricao = in_descricao;
    }
    

}



