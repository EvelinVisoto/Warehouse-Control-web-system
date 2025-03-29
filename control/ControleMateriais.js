const Materiais = require("../model/Materiais")
module.exports = class ControleMateriais {

    async cadastrarMateriais(request, response) {
        const mat = new Materiais();
        mat.codigo_mat = request.body.codigo_mat; //cp
        mat.tipo = request.body.tipo;
        mat.numeroBp = request.body.numeroBp;
        mat.descricao = request.body.descricao;
        mat.observacao = request.body.observacao;

       

        await mat.create();
        const resposta = { status: true,
             msg: 'material cadastrado com sucesso', 
             codigo: 201,
             dados: {
                codigo_mat: mat.codigo_mat || null,
                tipo: mat.tipo,
                numeroBp: mat.numeroBp,
                descricao: mat.descricao,
                observacao: mat.observacao
                
            } }
            
        response.status(201).send(resposta);
    }

    async LerMateriais(request, response) {
        console.log("ControleMateriais.LerMateriais()");
        const mat = new Materiais();
        mat.codigo_mat = request.body.codigo_mat;

        await mat.read();
        const resposta = { status: true, msg: 'material lido com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }

    //perguntar do id, se pd ser 
    async AtualizarMateriais(request, response) {
        const mat = new Materiais();
        mat.codigo_mat = request.body.codigo_mat; //cp
        mat.tipo = request.body.tipo;
        mat.numeroBp = request.body.numeroBp;
        mat.descricao = request.body.descricao;
        mat.observacao = request.body.observacao;
        await mat.update();
        const resposta = { status: true, msg: 'material atualizado com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }

    async ExcluirMateriais(request, response) {
        const mat = new Materiais();
        mat.codigo_mat = request.body.codigo_mat;
       
        await mat.delete();
        const resposta = { status: true, msg: 'Material excluido com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }
}