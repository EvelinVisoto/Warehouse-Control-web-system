const mysql = require("mysql")
module.exports = class Banco {

    static CONNECTION = null;

    static getConexao() {


       /* host="tcc-almoxarifado.cpe2cay2sm2l.sa-east-1.rds.amazonaws.com",
        user="tcc",
        password="tcc_almoxarifado"
        
        hostname : 'tcc-almoxarifado.mysql.database.azure.com',
                username : 'tcc',
                password : 'Almoxarifado@',
                database : 'tcc-almoxarifado'
        -------------
        host: '127.0.0.1',
                user: 'root',
                password: '',//adicionar um, pois agr nn tem net para o banco
                database: 'almoxarifadoo'
        
        */

        if (Banco.CONNECTION == null) {
            Banco.CONNECTION = mysql.createPool({
                connectionLimit: 128,
                host: '127.0.0.1',
                user: 'root',
                password: '',//adicionar um, pois agr nn tem net para o banco
                database: 'almoxarifado'
            });
            return Banco.CONNECTION;
        } else {
            return Banco.CONNECTION;
        }

    }

      

}