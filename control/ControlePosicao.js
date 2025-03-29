const Posicao = require("../model/Posicao")
const Materiais = require("../model/Materiais")

//RELACIONAR ASSISTINDO A AULA4 DO YOUTUBE!!

module.exports = class ControlePosicao {

    async cadastrarPosicao(request, response) {
        const pos = new Posicao();

        pos.quantidadeMinima = request.body.quantidadeMinima;
        pos.quantidadeAtual = request.body.quantidadeAtual;
        pos.quantidadeMaxima = request.body.quantidadeMaxima;
        pos.codigo = request.body.materiais_codigo_mat.codigo;

        console.log(request.body);

        await pos.create().then(() => {
            const resposta = { status: true, msg: 'posicao cadastrada com sucesso', codigo: 201 }
            response.status(201).send(resposta);
        }).catch (error => {
            const resposta = { status: false, msg: 'nulo ou ja existe', codigo: 200 }
            response.status(500).send(resposta);
          });

    }

    async LerPosicao(request, response) {
        const pos = new Posicao();
        pos.codigo = request.params.codigo.codigo_mat;

        await pos.read();
        const resposta = { status: true, msg: 'posicao lido com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }


    async AtualizarPosicao(request, response) {
        const pos = new Posicao();
        //console.log(request);
        pos.codigo = request.params.codigo.codigo_mat; /**? */
        pos.quantidadeMinima = request.body.quantidadeMinima;
        pos.quantidadeAtual = request.body.quantidadeAtual;
        pos.quantidadeMaxima = request.body.quantidadeMaxima;




        await pos.update();
        const resposta = { status: true, msg: 'posicao atualizado com sucesso', codigo: 201 }
        response.status(201).send(resposta);


    }



    async Excluirposicao(request, response) {
        const pos = new Posicao();
        pos.codigo = request.params.codigo.codigo_mat;
        // iten.codigoiten = request.body.codigo_iten.codigo_mat;
        //iten.qtdeiten = request.body.codigo_iten;

        await pos.delete();
        const resposta = { status: true, msg: 'posicao excluida com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }
}