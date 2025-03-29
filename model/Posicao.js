const Banco = require("./Banco");
const Movimentacao = require("./Movimentacao");
const Materiais = require("../model/Materiais");

module.exports = class Posicao {
    constructor() {
        this._quantidadeMinima = null;
        this._quantidadeAtual = null;
        this._quantidadeMaxima = null;
        this._codigo = new Materiais();
    }

    async create() {
        

        const operacaoAssincrona = new Promise((resolve, reject) => {
            const minima = this.quantidadeMinima;
            const atual = this.quantidadeAtual;
            const maxima = this.quantidadeMaxima;
            const codigo = this.codigo;

            const parametros = [minima, atual, maxima, codigo];
            let sql = "INSERT INTO `almoxarifado`.`posicao_estoque` (`quantidadeMinima`, `quantidadeAtual`, `quantidadeMaxima`, `materiais_codigo_mat` ) VALUES (?, ?, ?, ?);";

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

    async read() {
        const codigo = this.codigo ? this.codigo.codigo_mat : null;
        const operacaoAssincrona = new Promise((resolve, reject) => {
            let sql = "";
            let parametros = [];
            if (codigo == null) {
                sql = "SELECT * FROM posicao_estoque order by quantidadeAtual";
            } else {
                sql = "SELECT * FROM posicao_estoque where materiais_codigo_mat=?";
                parametros = [codigo];
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
        if (!this._codigo || !this._codigo.codigo_mat) {
            throw new Error("codigo_mat não está definido");
        }

        const operacaoAssincrona = new Promise((resolve, reject) => {
            const minima = this.quantidadeMinima;
            const atual = this.quantidadeAtual;
            const maxima = this.quantidadeMaxima;
            const codigo = this.codigo.codigo_mat;

            const parametros = [minima, atual, maxima, codigo];
            let sql = "update posicao_estoque set quantidadeMinima=? , quantidadeAtual=?, quantidadeMaxima=? where materiais_codigo_mat=?";
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
        if (!this._codigo || !this._codigo.codigo_mat) {
            throw new Error("codigo_mat não está definido");
        }

        const operacaoAssincrona = new Promise((resolve, reject) => {
            const codigo = this.codigo.codigo_mat;
            let parametros = [codigo];

            let sql = "delete from posicao_estoque where materiais_codigo_mat=?";
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

    get codigo() {
        return this._codigo;
    }
    set codigo(in_codigo) {
        this._codigo = in_codigo;
    }

    get quantidadeMinima() {
        return this._minima;
    }
    set quantidadeMinima(in_minima) {
        this._minima = in_minima;
    }

    get quantidadeAtual() {
        return this._atual;
    }
    set quantidadeAtual(in_atual) {
        this._atual = in_atual;
    }

    get quantidadeMaxima() {
        return this._maxima;
    }
    set quantidadeMaxima(in_maxima) {
        this._maxima = in_maxima;
    }
}


