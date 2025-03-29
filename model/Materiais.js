const Banco = require("./Banco")
module.exports = class Materiais {

    constructor() {
        this._codigo_mat = null;
        this._tipo = null;
        this._numeroBp = null;
        this._descricao = null;
        this._observacao = null;

    }
    async create() {
        const operacaoAssincrona = new Promise((resolve, reject) => {

            const parametros = [this.codigo_mat, this.tipo, this.numeroBp, this.descricao, this.observacao];
            const sql = "INSERT INTO materiais (codigo_mat, tipo, numeroBp, descricao, observacao) VALUES (?, ?, ?, ?, ?);";
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
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const codigo_mat = this.codigo_mat;
            const parametros = [codigo_mat];
            let sql = "";
            if (codigo_mat == null) {
                sql = "SELECT * FROM materiais order by tipo";
            } else {
                sql = "SELECT * FROM materiais where codigo_mat=?";
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
            const parametros = [this.tipo, this.numeroBp, this.descricao, this.observacao, this.codigo_mat];
            const sql = "UPDATE materiais SET tipo=?, numeroBp=?, descricao=?, observacao=? WHERE codigo_mat=?";
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
            const parametros = [this.codigo_mat];
            const sql = "DELETE FROM materiais WHERE codigo_mat=?";
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

    get codigo_mat() {
        return this._codigo_mat;
    }
    set codigo_mat(value) {
        this._codigo_mat = value;
    }
                
    get tipo() {
        return this._tipo;
    }
    set tipo(value) {
        this._tipo = value;
    }
                
    get numeroBp() {
        return this._numeroBp;
    }
    set numeroBp(value) {
        this._numeroBp = value;
    }
                
    get descricao() {
        return this._descricao;
    }
    set descricao(value) {
        this._descricao = value;
    }
                
    get observacao() {
        return this._observacao;
    }
    set observacao(value) {
        this._observacao = value;
    }
}



