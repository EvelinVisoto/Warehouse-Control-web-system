//
var md5 = require('md5'); //npm install md5 --save  doc=> https://www.npmjs.com/package/md5
const Banco = require("./Banco")

module.exports = class Professor {

    constructor() {
        this._registro = null;
        this._nome = null;
        this._telefone = null;
        this._tipo = null;
        this._senha = null;
        this._email = null;
        
    }

    /**
     * o método é chamado no arquivo rotas_funcionarios.js quando é recebido um POST:/funcionário
     * @returns {Promise} resolve se cadastrado e reject caso aconteça algum erro
     */

    async create() {
  
        const operacaoAssincrona = new Promise((resolve, reject) => {

            const registro = this.registro;
            const nome = this.nome;
            const telefone = this.telefone;
            const tipoUsuario = this.tipoUsuario;
            const senha = this.senha;
            const email = this.email;
            
            const parametros = [registro, nome, telefone, tipoUsuario, senha, email];
            console.log(email)
            
            let sql = "INSERT INTO  `almoxarifado`.`professor` (`registro`, `nome`, `telefone`, `tipoUsuario`, `senha`, `email` ) VALUES (?, ?, ?, ?, ?, ?);";

            Banco.getConexao().query(sql, parametros, function (error, result) {
                if (error) {
                    console.log("reject => professor.create(): " + JSON.stringify(error))
                    reject(error);
                    console.log("SQL:" + sql);
                } else {
                    console.log("resolve => professor.create(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }


    /**
      * o método é chamado no arquivo rotas_funcionarios
      * quando é recebido um GET:/funcionarios ou
      * quando é recebido um GET:/funcionarios/:id
      * observe que as as duas rotas chamam o mesmo método read()
      * @returns {Promise} resolve se o sql for executado com sucesso e reject caso aconteça algum erro
      */
    async read() {

        const operacaoAssincrona = new Promise((resolve, reject) => {

            const registro = this.registro;
            let params = [registro];
            let sql = "";

            //if (id == null) {
             //   SQL = "SELECT idFuncionario,nome,email,recebeValeTransporte,idCargo,nomeCargo FROM funcionario JOIN cargo ON cargo.idCargo = funcionario.Cargo_idCargo  ORDER BY nome, nomeCargo";
            //} else {
             //   SQL = "SELECT idFuncionario,nome,email,recebeValeTransporte,idCargo,nomeCargo FROM funcionario JOIN cargo ON cargo.idCargo = funcionario.Cargo_idCargo where idFuncionario=? ORDER BY nome, nomeCargo ";
           // }

           if (registro == null) {
            sql = "SELECT * FROM professor order by nome";
        } else {
            sql = "SELECT * FROM professor where registro=?";
        }

            Banco.getConexao().query(sql, params, function (error, result) {
                if (error) {
                     console.log("reject => professor.read(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => professor.read(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
         return operacaoAssincrona;
    }

    /**
      * o método é chamado no arquivo rotas_funcionarios pela função app.put('/funcionarios/:id')
      * quando é recebido um PUT:/funcionarios/:id
      * @returns {Promise} resolve se o sql for executado com sucesso e reject caso aconteça algum erro
      */
    async update() {


        const operacaoAssincrona = new Promise((resolve, reject) => {

            const registro = this.registro;
            const nome = this.nome;
            const telefone = this.telefone;
            const tipoUsuario = this.tipoUsuario;
            const senha = md5(this.senha);
            const email = this.email;

            const parametros = [nome, telefone, tipoUsuario, senha, email, registro];
           
            //cria a instrução sql que será executada
            const sql = "update professor set nome=?,telefone=?,tipoUsuario=?, senha=?, email=?  where registro = ?";

            //substitui os sinais de ? pelos parametros e executa a instrução no sgbd
            Banco.getConexao().query(sql, parametros, function (error, result) {
                if (error) {
                    console.log("reject => professor.update(): " + JSON.stringify(error))
                    reject(error);
                } else {
                    console.log("resolve => professor.update(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });

        //retorna uma promise para rotas_funcionario.js  na funçao => app.put('/funcionarios')
        return operacaoAssincrona;
    }


    /**
      * o método é chamado no arquivo rotas_funcionarios pela função app.delete('/funcionarios/:id')
      * quando é recebido um DELETE:/funcionarios/:id
      * @returns {Promise} resolve se o sql for executado com sucesso e reject caso aconteça algum erro
    */
    async delete() {
      
        const operacaoAssincrona = new Promise((resolve, reject) => {
            const registro = this.registro;

            let parametros = [registro];

            //cria a instrução sql que será executada
            let sql = "delete from professor where registro = ?";
            //substitui os sinais de ? pelos parametros e executa a instrução no sgbd
            Banco.getConexao().query(sql, parametros, function (error, result) {
                if (error) {
                    console.log("reject => professor.delete(): " + JSON.stringify(error));
                    reject(error);
                } else {
                     console.log("resolve => professor.delete(): " + JSON.stringify(result))
                    resolve(result);
                }
            });
        });
        return operacaoAssincrona;
    }


    async login() {
        const operacaoAssincrona = new Promise((resolve, reject) => {
            
            const registro = this.registro;
            const senha = this.senha;
            const parametros = [registro, senha];


            const sql = "SELECT COUNT(*) AS qtd ,registro, nome, telefone, tipoUsuario, email FROM professor WHERE registro =? AND senha =?";

            Banco.getConexao().query(sql, parametros, (error, result) => {

                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    console.log(result)
                    if (result[0].qtd > 0) {
                        const resposta = {
                            status: true,
                            registro: result[0].registro,
                            nome: result[0].nome,
                            telefone: result[0].telefone,
                            tipoUsuario: result[0].tipoUsuario,
                            
                        }
                        resolve(resposta);
                    } else {
                        const resposta = {
                            status: false,
                        }
                        resolve(resposta);
                    }

                }
            });
        });
        return operacaoAssincrona;
    }



    // métodos get/set tradicionais


    get registro() {
        return this._registro;
    }
    set registro(in_registroprof) {
        this._registro = in_registroprof;
    }

    get nome() {
        return this._nomeprof;
    }
    set nome(in_nomeprof) {
        this._nomeprof = in_nomeprof;
    }

    get telefone() {
        return this._telefoneprof;
    }
    set telefone(in_telefoneprof) {
        this._telefoneprof = in_telefoneprof;
    }

    get tipoUsuario() {
        return this._usuarioadmprof;
    }
    set tipoUsuario(in_usuarioadmprof) {
        this._usuarioadmprof = in_usuarioadmprof;
    }

    get senha() {
        return this._senha;
    }
    set senha(in_senhaprof) {
        this._senha = in_senhaprof;
    }

    get email() {
        return this._email;
    }
    set email(in_email) {
        this._email = in_email;
    }


}

