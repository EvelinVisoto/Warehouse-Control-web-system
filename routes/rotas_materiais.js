const {request, response} = require("express");
const Professor = require("../model/Materiais");
const ControleProfessor = require("../control/ControleMateriais");
const ControleMateriais = require("../control/ControleMateriais");
const Banco = require("../model/Banco");

module.exports = function(app){
    app.post("/materiais",async (request,response)=>{
        console.log(" app.post(/materiais/)");

        const controleMateriais = new ControleMateriais();
        controleMateriais.cadastrarMateriais(request,response);
       
    });

    //perguntar dessa parte

    app.get("/materiais/:codigo_mat",async (request,response)=>{
        console.log(" app.get(/materiais/:codigo_mat/)");
        console.log(":)/");

        const controleMateriais = new ControleMateriais();
        controleMateriais.cadastrarMateriais(request,response);
      
       
    });

    app.put("/materiais/:codigo_mat",async (request,response)=>{
        console.log("atualizou")
        try {
            const controleMateriais = new ControleMateriais();
            await controleMateriais.ExcluirMateriais(request, response);
        } catch (error) {
            console.error("Erro ao excluir materiais:", error);
            response.status(500).send("Erro ao excluir materiais");
        }
    });

    /*//PROF FEZ ESSE
    app.get('/material/:numeroBP', (req, res) => {
        console.log(" app.get(/material/:numeroBP)");
        const codigoBP = req.params.numeroBP;
        const sql = 'SELECT codigo_mat as codigo, descricao, quantidadeAtual FROM materiais join posicao_estoque on materiais_codigo_mat = codigo_mat where numeroBp =' + codigoBP ; 
        console.log(sql);
        Banco.getConexao().query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ status: false, message: 'Erro ao buscar códigoBP', error: err });
            }
            res.json({ status: true, dados: results });  // Retorna os dados em formato JSON
        });
    });*/

    

    // Pesquisar por Código
    app.get('/material/codigo_mat/:pesquisa', (req, res) => {
        const codigo_mat = req.params.pesquisa;
        const sql = 'SELECT codigo_mat as codigo, descricao, quantidadeAtual FROM materiais join posicao_estoque on materiais_codigo_mat = codigo_mat WHERE codigo_mat = ' + codigo_mat;
        console.log(sql);
        Banco.getConexao().query(sql, (err, results) => {
            if (err) {
            return res.status(500).json({ status: false, message: 'Erro ao buscar por código', error: err });
            }
            res.json({ status: true, dados: results });
        });
    });

    // Pesquisar por Tipo
    app.get('/material/tipo/:pesquisa', (req, res) => {
        const tipo = req.params.pesquisa;
        const sql = `SELECT codigo_mat as codigo, descricao, quantidadeAtual FROM materiais JOIN posicao_estoque ON materiais_codigo_mat = codigo_mat WHERE tipo like '${tipo}'`;
        console.log(sql);
        Banco.getConexao().query(sql, (err, results) => {
            if (err) {
            return res.status(500).json({ status: false, message: 'Erro ao buscar por tipo', error: err });
            }
            res.json({ status: true, dados: results });
        });
    });

    // Pesquisar por Descrição
    app.get('/material/descricao/:pesquisa', (req, res) => {
        const descricao = req.params.pesquisa;
        const sql = `SELECT codigo_mat as codigo, descricao, quantidadeAtual FROM materiais JOIN posicao_estoque ON materiais_codigo_mat = codigo_mat WHERE descricao like '%${descricao}%'`;
        console.log(sql);
        Banco.getConexao().query(sql, (err, results) => {
            if (err) {
            return res.status(500).json({ status: false, message: 'Erro ao buscar por descrição', error: err });
            }
            res.json({ status: true, dados: results });
        });
    });

    // Pesquisar por Observação
    app.get('/material/observacao/:pesquisa', (req, res) => {
        const observacao = req.params.pesquisa;
        const sql = `SELECT codigo_mat as codigo, descricao, quantidadeAtual FROM materiais JOIN posicao_estoque ON materiais_codigo_mat = codigo_mat WHERE observacao like '%${observacao}'`;
        console.log(sql);
        Banco.getConexao().query(sql, (err, results) => {
            if (err) {
            return res.status(500).json({ status: false, message: 'Erro ao buscar por observação', error: err });
            }
            res.json({ status: true, dados: results });
        });
    });

    //Pesquisar por numeroBP
    app.get('/material/numeroBP/:pesquisa', (req, res) => {
        console.log(" app.get(/material/:numeroBP)");
        const numeroBP = req.params.pesquisa;
        const sql = 'SELECT codigo_mat as codigo, descricao, quantidadeAtual FROM materiais join posicao_estoque on materiais_codigo_mat = codigo_mat WHERE numeroBp =' + numeroBP ; 
        console.log(sql);
        Banco.getConexao().query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ status: false, message: 'Erro ao buscar códigoBP', error: err });
            }
            res.json({ status: true, dados: results });  // Retorna os dados em formato JSON
        });
    });
}

