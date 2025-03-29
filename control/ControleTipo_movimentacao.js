
const Tipo = require("../model/Tipo");
const JWT = require("../model/JwtToken");//fzr posicao



module.exports = class ControleTipo_movimentacao {

    async Adicionar_tipo(request, response) {
        const tipo = new Tipo();
        tipo.idTipoMovimentacao = request.body.idTipoMovimentacao; //pela confusao aqui é o nome q ta no banco ou no modelo?
        tipo.tipoEntrada = request.body.tipoEntrada;
        tipo.descricao = request.body.descricao;


        await tipo.create();
        const resposta = { status: true, msg: 'tipo cadastrado com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }

    async Ler_tipo(request, response) {
        const tipo = new Tipo();
        tipo.idTipoMovimentacao = request.params.idTipoMovimentacao;
      
      
        await tipo.read();
        const resposta = { status: true, msg: 'tipo lido com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }

    
    async Atualizar_tipo(request, response) {
        const tipo = new Tipo();
        //console.log(request);
        tipo.idTipoMovimentacao = request.params.idTipoMovimentacao; /**? */
        tipo.tipoEntrada = request.body.tipoEntrada;
        tipo.descricao = request.body.descricao;

        //console.log("AQUI ESTOU PRINTANDO IT\n\n");
        //console.log(iten);

        await tipo.update();
        const resposta = { status: true, msg: 'tipo atualizado com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }

    
    async Excluir_tipo(request, response) {
        const tipo = new Tipo();
         tipo.idTipoMovimentacao = request.params.idTipoMovimentacao;
      
       // iten.codigoiten = request.body.codigo_iten.codigo_mat;
       //iten.qtdeiten = request.body.codigo_iten;

        await tipo.delete();
        const resposta = { status: true, msg: 'tipo excluida com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }
}