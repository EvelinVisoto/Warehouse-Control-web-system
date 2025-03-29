const { json } = require("express");
const Banco = require("./Banco")
const Professor = require("./Professor")
const Tipo = require("./Tipo")

module.exports = class Movimentacao {


    constructor() {
        this._idMovimentacao = null;
        this._data = null;
        this._hora = null;
        this._professor = new Professor();
        this._tipoMovimentacao = new Tipo(); 
        this._observacao = null;
    }
  
    async create() {
        console.log("Movimentacao.create()");
        //console.debug("Movimentacao.create() ")
        const operacaoAssincrona = new Promise((resolve, reject) => {
           
            const idMovimentacao = this.idMovimentacao;
            const data = this.data;
            const hora = this.hora;
            const professor = this.professor;
            const tipo = this.tipoMovimentacao;
            const observacao = this.observacao;

            const parametros = [idMovimentacao, data, hora, observacao, tipo, professor ];
            const sql = "INSERT INTO `almoxarifado`.`movimentacao` (`idMovimentacao`, `data`, `hora`, `observacao_mov`, `tipoMovimentacao_idTipoMovimentacao`, `professor_registro` ) VALUES (?, ?, ?, ?, ?, ?);";
           
            Banco.getConexao().query(sql, parametros, function (error, result) {
                if (error) {

                    console.log(error)
                    reject(error);
                   
                } else {
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }
    async read(order) {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const idMovimentacao = this.idMovimentacao;
            const parametros = [idMovimentacao];
            let sql = "";
            if (idMovimentacao == null) {
              
                    sql = "SELECT * FROM movimentacao order by data";
                }else{
                    sql = "SELECT * FROM movimentacao where idMovimentacao=?";
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
            const idMovimentacao = this.idMovimentacao;
            const data = this.data;
            const hora = this.hora;
            const professor = this.professor.registro;
            const tipo = this.tipoMovimentacao.idTipoMovimentacao;
            const observacao = this.observacao;

            const parametros = [data, hora, observacao, tipo, professor, idMovimentacao];
           
            const sql = "update movimentacao set data=?, hora=?, observacao= ?, tipoMovimentacao_idTipoMovimentacao=?, professor_registro=? where  idMovimentacao= ?";
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
            const idMovimentacao = this.idMovimentacao;
            let parametros = [idMovimentacao];
           
            let sql = "delete from movimentacao where idMovimentacao=?";
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


    //relacionar a foreing key
        
  

    get idMovimentacao() {
        return this._idMovimentacao;
    }
    set idMovimentacao(in_idmovimentacao) {
        this._idMovimentacao = in_idmovimentacao;
    }

    get data() {
        return this._datamov;
    }
    set data(in_datamov) {
        this._datamov = in_datamov;
    }

    get hora() {
        return this._hora;
    }
    set hora(in_horamov) {
        this._hora = in_horamov;
    }

    //ver se ta certo!!! pq foi feito pela extensao na 1vz!!
    get professor() {
        return this._professor; //observar como posso fzr isso!!! 
    }
    set professor(in_professormov) {
        this._professor = in_professormov;
    }

    get tipoMovimentacao() {
        return this._tipoMovimentacao;
    }
    set tipoMovimentacao(in_tipomov) {
        this._tipoMovimentacao = in_tipomov;
    }

    get observacao() {
        return this._observacao;
    }
    set observacao(in_observacaomov) {
        this._observacao = in_observacaomov;
    }


}