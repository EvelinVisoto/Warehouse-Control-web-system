const {request, response} = require("express");
const Banco = require("../model/Banco");
const ControleTipo = require("../control/ControleTipo_movimentacao");
//const router = express.Router();

module.exports = function(app){
    app.post("/tipoMovimentacao",async (request,response)=>{
        console.log(":)/");

        const controletipo = new ControleTipo();
        console.log("passou")
        controletipo.Adicionar_tipo(request,response);
    
       
    });

    //perguntar dessa parte

    app.get("/tipoMovimentacao/:idMovimentacao",async (request,response)=>{
        console.log(":)//");

        const controletipo = new ControleTipo();
        controletipo.Ler_tipo(request,response);
       
    });

    app.get('/tipoMovimentacao', (req, res) => {
        const sql = 'SELECT tipoEntrada, idTipoMovimentacao as idtipo FROM tipomovimentacao';  
        Banco.getConexao().query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ status: false, message: 'Erro ao buscar tipo', error: err });
            }
            res.json({ status: true, dados: results });  // Retorna os dados em formato JSON
        });
    });

    
    app.put("/tipoMovimentacao/:idMovimentacao",async (request,response)=>{
        console.log("atualizado")
 
        const controletipo = new ControleTipo();
 
        controletipo.Atualizar_tipo(request,response);
 
    });
    

    app.delete("/tipoMovimentacao/:idMovimentacao",async (request,response)=>{
        console.log("deletado")
 
        const controletipo = new ControleTipo();
        controletipo.Excluir_tipo(request,response);
 
    });

}

