const {request, response} = require("express");
const MHM = require("../model/Movimentacaohasmateriais");
const ControleMHM = require("../control/ControleMovimentacaohasmateriais")
module.exports = function(app){
    app.post("/movimentacaohasmateriais",async (request,response)=>{
        console.log(":)/");

        const controlemhm = new ControleMHM();
        console.log("passou")
        controlemhm.cadastrarMHM(request,response);
    
       
    });

    //perguntar dessa parte

    app.get("/movimentacaohasmateriais/:idMovimentacao",async (request,response)=>{
        console.log(":)//");

        const controlemhm = new ControleMHM();
        controlemhm.LerMHM(request,response);
       
    });

    //coloca o put aqui e o ":numeroiten"
    app.put("/movimentacaohasmateriais/:idMovimentacao",async (request,response)=>{
        console.log("atualizado")
 
        const controlemhm = new ControleMHM();
 
        controlemhm.AtualizarMHM(request,response);
 
    });
    

    app.delete("/movimentacaohasmateriais/:idMovimentacao",async (request,response)=>{
        console.log("deletado")
 
        const controlemhm = new ControleMHM();
 
        controlemhm.ExcluirMHM(request,response);
 
    });

}

