const {request, response} = require("express");
const Movimentacao = require("../model/Movimentacao");
const Banco = require("../model/Banco");
const ControleMovimentacao = require("../control/ControleMovimentacao");

module.exports = function(app){
    app.post("/movimentacao",async (request,response)=>{
        console.log(":)");

        const controleMovimentacao = new ControleMovimentacao();
        controleMovimentacao.cadastrarMovimentacao(request,response);
    
       
    });

    //perguntar dessa parte

    app.get("/movimentacao/:idMovimentacao",async (request,response)=>{
        console.log(":)");

        const controleMovimentacao = new ControleMovimentacao();
        controleMovimentacao.LerMovimentacao(request,response);
       
        
       
    });

    /*app.get('/nextId', async (req, res) => {
        const sql = "select idMovimentacao +1 as ultimoId from movimentacao order by idMovimentacao desc limit 1";
        
        try {
          const result = await Banco.query(sql);
          const ultimoId = result[0]?.ultimoId || 1; // Inicia com 1 se não houver resultado
          res.json({ ultimoId });
        } catch (error) {
          console.error('Erro ao buscar o próximo ID:', error);
          res.status(500).json({ error: 'Erro ao buscar o próximo ID' });
        }
      });*/
/*
      app.get('/nextId', (req, res) => {
        console.log("oi");
        const sql = "select idMovimentacao +1 as ultimoId from movimentacao order by idMovimentacao desc limit 1"; // Consulta SQL para buscar professores
        Banco.getConexao().query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ status: false, message: 'Erro ao buscar o id', error: err });
            }
            res.json({ status: true, dados: results });  // Retorna os dados em formato JSON
        });
    });

*/
    app.get("/nextid",async (request,response)=>{
      console.log("atualizou o id")

      //console.log("oi");
      const sql = "select idMovimentacao +1 as ultimoId from movimentacao order by idMovimentacao desc limit 1"; // Consulta SQL para buscar professores
      Banco.getConexao().query(sql, (err, results) => {
          if (err) {
              return response.status(500).json({ status: false, message: 'Erro ao buscar o id', error: err });
          }
          response.json({ status: true, dados: results });  // Retorna os dados em formato JSON
      });

   });

  /* app.put("/somarQuantidade/:codigo_mat/:qtd", async (request, response) => {
    const { codigo_mat, qtd } = request.params;  // Captura os parâmetros da URL

    // Verifica se o código do material foi fornecido
    if (!codigo_mat) {
        return response.status(400).json({ status: false, message: 'Código do material é obrigatório' });
    }

    // Converte a quantidade para um número inteiro
    const quantidade = parseInt(qtd, 10);
    // Verifica se a quantidade é um número válido
    if (isNaN(quantidade) || quantidade <= 0) {
        return response.status(400).json({ status: false, message: 'Quantidade deve ser um número positivo' });
    }

    const sql = "UPDATE posicao_estoque SET quantidadeAtual = quantidadeAtual + ? WHERE materiais_codigo_mat = ?";

    Banco.getConexao().query(sql, [quantidade, codigo_mat], (err, results) => {
        if (err) {
            console.error('Erro na query:', err);
            return response.status(500).json({ status: false, message: 'Erro ao atualizar a quantidade', error: err });
        }
        console.log('Resultados do update:', results);
        response.json({ status: true, message: 'Quantidade atualizada com sucesso' });
    });
  });*/


   /*app.put("/subtrairQuantidade/:codigo_mat/:qtd", async (request, response) => {
    const { codigo_mat, qtd } = request.params;

    // Verificar se qtd é um número válido
    const quantidade = parseInt(qtd);
    if (isNaN(quantidade) || quantidade <= 0) {
        return response.status(400).json({ status: false, message: 'Quantidade deve ser um número positivo' });
    }

    // Verificação se os parâmetros foram recebidos corretamente
    if (!codigo_mat) {
        return response.status(400).json({ status: false, message: 'Código do material é obrigatório' });
    }

    // Primeiro, vamos verificar a quantidade atual em estoque
    const verificaEstoqueSql = "SELECT quantidadeAtual FROM posicao_estoque WHERE materiais_codigo_mat = ?";
    
    Banco.getConexao().query(verificaEstoqueSql, [codigo_mat], (err, results) => {
        if (err) {
            return response.status(500).json({ status: false, message: 'Erro ao verificar a quantidade em estoque', error: err });
        }

        if (results.length === 0) {
            return response.status(404).json({ status: false, message: 'Material não encontrado' });
        }

        const quantidadeAtual = results[0].quantidadeAtual;
        if (quantidadeAtual < quantidade) {
            return response.status(400).json({ status: false, message: 'Quantidade insuficiente em estoque' });
        }

        // Se tudo estiver ok, subtraímos a quantidade
        const sql = "UPDATE posicao_estoque SET quantidadeAtual = quantidadeAtual - ? WHERE materiais_codigo_mat = ?";
        
        Banco.getConexao().query(sql, [quantidade, codigo_mat], (err, results) => {
            if (err) {
                return response.status(500).json({ status: false, message: 'Erro ao atualizar a quantidade', error: err });
            }
            response.json({ status: true, message: 'Quantidade atualizada com sucesso' });
        });
    });
 });*/

}

