const Movimentacao_Materiais = require("../model/Movimentacaohasmateriais")
const Movimentacao = require("../model/Movimentacao")
const Materiais = require("../model/Materiais")

//RELACIONAR ASSISTINDO A AULA4 DO YOUTUBE!!

module.exports = class ControleIten_retirado {

    async cadastrarMHM(request, response) {
        const mhm = new Movimentacao_Materiais();
        mhm.qtd = request.body.qtd;
        mhm.codigo = request.body.materiais_codigo_mat.codigo;
        mhm.idMovimentacao = request.body.movimentacao_idMovimentacao.idMovimentacao;



        await mhm.create();
        const resposta = { status: true, msg: 'iten cadastrado com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }

    async LerMHM(request, response) {
        const mhm = new Movimentacao_Materiais();
        mhm.idMovimentacao = request.params.movimentacao_idMovimentacao;

        await mhm.read();
        const resposta = { status: true, msg: 'iten lido com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }

    
    async AtualizarMHM(request, response) {
        const mhm = new Movimentacao_Materiais();
        //console.log(request);
        mhm.idMovimentacao = request.params.movimentacao_idMovimentacao;
        mhm.qtd = request.body.qtd;
        mhm.codigo = request.body.materiais_codigo_mat;
        

        await mhm.update();
        const resposta = { status: true, msg: 'Iten atualizado com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }

    
    async ExcluirMHM(request, response) {
        const mhm = new Movimentacao_Materiais();
        mhm.idMovimentacao = request.params.movimentacao_idMovimentacao;
       
        await mhm.delete();
        const resposta = { status: true, msg: 'Movimentacao excluida com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }
}