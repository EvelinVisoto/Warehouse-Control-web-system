const {request, response} = require("express");
const Posicao = require("../model/Posicao");
const ControlePosicao = require("../control/ControlePosicao")
module.exports = function(app){
    app.post("/posicao",async (request,response)=>{
        console.log(":)/");

        const controleposicao = new ControlePosicao();
        console.log("passou")
        controleposicao.cadastrarPosicao(request,response);
    
       
    });

    //perguntar dessa parte

    app.get("/posicao/:codigo",async (request,response)=>{
        console.log(":)//");

        const controleposicao = new ControlePosicao();
        controleposicao.LerPosicao(request,response);
       
    });

    //coloca o put aqui e o ":numeroiten"
    app.put("/posicao/:codigo",async (request,response)=>{
        console.log("atualizado")
 
        const controleposicao = new ControlePosicao();
 
        controleposicao.AtualizarPosicao(request,response);
 
    });
    

    app.delete("/posicao/:codigo",async (request,response)=>{
        console.log("deletado")
 
        const controleposicao = new ControlePosicao();
 
        controleposicao.Excluirposicao(request,response);
 
    });

}

