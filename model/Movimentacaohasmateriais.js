const Banco = require("./Banco")
const Movimentacao = require("./Movimentacao")
const Materiais = require("./Materiais")

module.exports = class Iten_retirado {

    constructor() {

        this._qtd = null;
        this._codigo = new Materiais();
        this._idMovimentacao = new Movimentacao();

        
    }
    async create() {
        const operacaoAssincrona = new Promise((resolve, reject) => {

            let parametros = [this.qtd, this.codigo, this.idMovimentacao];
            console.log(parametros);

            let sql = "INSERT INTO `almoxarifado`.`movimentacao_has_materiais` (`qtd`, `materiais_codigo_mat`, `movimentacao_idMovimentacao`) VALUES (?, ?, ?);";
           // let sql ="show tables;";
            Banco.getConexao().query(sql, parametros, function (error, result) {
                if (error) {
                    reject(error);
                    //console.log("SQL:" + sql)
                } else {
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }
    async read() {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const idMovimentacao = this.idMovimentacao.idMovimentacao;
            
            let parametros = [idMovimentacao];
             let sql = "";
            if (id == null) {
                   sql = "SELECT * FROM movimentacao_has_materiais order by materiais_codigo_mat";
                   // sql ="show tables;";
            } else {
                sql = "SELECT * FROM movimentacao_has_materiais where movimentacao_idMovimentacao=?";
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
            //console.log("isto estou recebendo do resolve\n\n");
            //console.log(this);
            const qtd = this.qtd;
            const codigo = this.codigo.codigo_mat;
            const idMovimentacao = this.idMovimentacao.idMovimentacao;

            //console.log(qtde_iten);
            //console.log("ESTE É O NUMERO ITEN" +numeroiten);
            const parametros = [qtd, codigo, idMovimentacao];
            let sql = "update movimentacao_has_materiais set qtd=? , materiais_codigo_mat=? where movimentacao_idMovimentacao= ?";
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
            const idMovimentacao = this.idMovimentacao.idMovimentacao;
            let parametros = [idMovimentacao];
           
            let sql = "delete from movimentacao_has_materiais where movimentacao_idMovimentacao=?";
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

    get qtd() {
        return this._qtd;
    }
    set qtd(in_qtd) {
        this._qtd = in_qtd;
    }
                
    get codigo() {
        return this._codigo;
    }
    set codigo(in_codigo) {
        this._codigo = in_codigo;
    }
                
    get idMovimentacao() {
        return this._idMovimentacao;
    }
    set idMovimentacao(in_idMovimentacao) {
        this._idMovimentacao = in_idMovimentacao;
    }


    

}



