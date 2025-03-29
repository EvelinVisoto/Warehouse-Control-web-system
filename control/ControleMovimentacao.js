const Movimentacao = require("../model/Movimentacao")
const Professor = require("../model/Professor");
const JWT = require("../model/JwtToken")
const Banco = require("../model/Banco");
module.exports = class ControleMovimentacao {

    async cadastrarMovimentacao(request, response) {
        console.log("ControleMovimentacao.cadastrarMovimentacao(request, response)");
        const auth = request.headers.authorization;

        const jwt = new JWT();
        const validou = jwt.validar(auth);

        if (validou.status == true) {
            //if do validou
            const mov = new Movimentacao();
            console.log(request.body)
            mov.idMovimentacao = request.body.idMovimentacao;
            mov.data = request.body.data;
            mov.hora = request.body.hora;
            mov.observacao = request.body.observacao_mov;

            mov.professor = new Professor();

            if (!request.body || !request.body.professor_registro || request.body.professor_registro.registro === undefined) {
                mov.professor = validou.payload.payload.registro;
            } else {
                mov.professor = request.body.professor_registro.registro;
                //console.log(mov.professor);
            }

            mov.tipoMovimentacao = request.body.tipoMovimentacao_idTipoMovimentacao.idTipoMovimentacao;



            await mov.create().then(async (temp) => {
                const resposta = {
                    status: true,
                    msg: 'Movimentacao cadastrada com sucesso',
                    codigo: 201,
                    dados: {
                        idMovimentacao: mov.insertIdd,
                        professor: mov.professor.registro,
                        token: jwt.gerar(validou.payload)
                    }



                }

                //update estoque

                /*await  request.body.MATERIAIS_SELECIONADOS.forEach(async material => {
                    //const material = mmm.MATERIAIS_SELECIONADOS[i];
                    console.log(`Código: ${material.codigo_mat}, Quantidade: ${material.qtd}`);
                    let oQueSomar =0;
                    const minima = "SELECT quantidadeMinima FROM posicao_estoque WHERE materiais_codigo_mat = " + material.codigo_mat;
                    const atual = "SELECT quantidadeAtual FROM posicao_estoque WHERE materiais_codigo_mat = " + material.codigo_mat;
                    if(request.body.tipoMovimentacao_idTipoMovimentacao.idTipoMovimentacao=="2" || request.body.tipoMovimentacao_idTipoMovimentacao.idTipoMovimentacao=="4"){
                        console.log("negativo"+ material.qtd  );
                        oQueSomar = material.qtd *-1;
                        const verificacao = atual + oQueSomar;
                        console.log("veri" + verificacao);
                        if (verificacao < 0){
                            showNotification("A quantidade NÃO pode ficar negativa!!");
                        }else{
                            const sql = "UPDATE posicao_estoque SET quantidadeAtual = quantidadeAtual + " + oQueSomar + " WHERE materiais_codigo_mat = " + material.codigo_mat;
                            console.log('Query formatada:', sql);
                            Banco.getConexao().query(sql, [oQueSomar, material.codigo_mat], (err, results) => {
                            });
                        }
                    }else if(request.body.tipoMovimentacao_idTipoMovimentacao.idTipoMovimentacao=="1" || request.body.tipoMovimentacao_idTipoMovimentacao.idTipoMovimentacao=="3"){
                        oQueSomar = material.qtd;
                        const sql = "UPDATE posicao_estoque SET quantidadeAtual = quantidadeAtual + " + oQueSomar + " WHERE materiais_codigo_mat = " + material.codigo_mat;
                        Banco.getConexao().query(sql, [oQueSomar, material.codigo_mat], (err, results) => {
                        });
                    }
                });*/

                await request.body.MATERIAIS_SELECIONADOS.forEach(async (material) => {
                    console.log(`Código: ${material.codigo_mat}, Quantidade: ${material.qtd}`);
                    let oQueSomar = 0;
                
                    // Consultas SQL para buscar a quantidade mínima e a quantidade atual do material
                    const sqlMinima = "SELECT quantidadeMinima FROM posicao_estoque WHERE materiais_codigo_mat = ?";
                    const sqlAtual = "SELECT quantidadeAtual FROM posicao_estoque WHERE materiais_codigo_mat = ?";
                
                    try {
                        // Buscar quantidade atual do material
                        Banco.getConexao().query(sqlAtual, [material.codigo_mat], (err, resultsAtual) => {
                            if (err) {
                                console.error("Erro ao buscar quantidade atual:", err);
                                return;
                            }
                
                            if (resultsAtual && Array.isArray(resultsAtual) && resultsAtual.length > 0) {
                                const quantidadeAtual = resultsAtual[0].quantidadeAtual;
                                console.log(`Quantidade atual do material ${material.codigo_mat}: ${quantidadeAtual}`);
                
                                // Se o tipo de movimentação for negativo (2 ou 4)
                                if (request.body.tipoMovimentacao_idTipoMovimentacao.idTipoMovimentacao == "2" || request.body.tipoMovimentacao_idTipoMovimentacao.idTipoMovimentacao == "4") {
                                    console.log("Movimentação negativa");
                                    oQueSomar = material.qtd * -1; // Subtração
                                    const verificacao = quantidadeAtual + oQueSomar; // Verificar se a quantidade será negativa
                
                                    // Se a quantidade ficar negativa, envia a notificação de erro
                                    if (verificacao < 0) {
                                        console.log("A quantidade não pode ficar negativa!");
            
                                    } else {
                                        console.log("Movimentação negativa permitida.");
                                        // Atualizar a quantidade no banco de dados
                                        const sqlUpdate = "UPDATE posicao_estoque SET quantidadeAtual = quantidadeAtual + ? WHERE materiais_codigo_mat = ?";
                                        Banco.getConexao().query(sqlUpdate, [oQueSomar, material.codigo_mat], (err, results) => {
                                            if (err) {
                                                console.error("Erro ao atualizar a quantidade no banco de dados:", err);
                                            }
                                        });
                                    }
                                } 
                                // Se o tipo de movimentação for positivo (1 ou 3)
                                else if (request.body.tipoMovimentacao_idTipoMovimentacao.idTipoMovimentacao == "1" || request.body.tipoMovimentacao_idTipoMovimentacao.idTipoMovimentacao == "3") {
                                    console.log("Movimentação positiva");
                                    oQueSomar = material.qtd; // Soma direta
                
                                    // Atualizar a quantidade no banco de dados
                                    const sqlUpdate = "UPDATE posicao_estoque SET quantidadeAtual = quantidadeAtual + ? WHERE materiais_codigo_mat = ?";
                                    Banco.getConexao().query(sqlUpdate, [oQueSomar, material.codigo_mat], (err, results) => {
                                        if (err) {
                                            console.error("Erro ao atualizar a quantidade no banco de dados:", err);
                                        }
                                    });
                                }
                            } else {
                                console.log("Material não encontrado para quantidade atual.");
                            }
                        });
                    } catch (error) {
                        console.error("Erro ao buscar dados do material:", error);
                    }
                });
                
                
                response.status(201).send(resposta);

            }).catch(temp => {
                console.error(temp);
                if (temp.errno == 1062) {
                    const resposta = {
                        status: false,
                        msg: 'Movimentação incorreta',
                        codigo: 201,
                        dados: {
                            idMovimentacao: null,
                            professor: mov.professor.registro,
                            token: jwt.gerar(validou.payload)
                        }
                    };

                    response.status(200).send(resposta);
                }
                console.log("oiii" + temp)
            });


        } else {
            const resposta = {
                status: false,
                msg: "token invalido",
                codigo: '003',
                dados: {

                }
            }
            response.status(200).send(resposta);
        }
    }

    async LerMovimentacao(request, response) {

        const auth = request.headers.authorization;

        const jwt = new JWT();
        const validou = jwt.validar(auth);

        console.log(":>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", validou);
        if (validou.status == true) {


            const mov = new Movimentacao();
            mov.idMovimentacao = request.parms.idMovimentacao
            //const order = request.parms.order ???

            await mov.read().then((temp) => {

                const resposta = {
                    status: true,
                    msg: 'Movimentacao lida com sucesso',
                    codigo: 201,
                    dados: {
                        idMovimentacao: mov.insertIdd,
                        professor: mov.professor.registro,
                        token: jwt.gerar(validou.payload)
                    }



                }

                response.status(201).send(resposta);


            }).catch(temp => {
                if (temp.errno == 1062) {
                    const resposta = {
                        status: false,
                        msg: 'Movimentação incorreta',
                        codigo: 201,
                        dados: {
                            idMovimentacao: null,
                            professor: mov.professor.registro,
                            token: jwt.gerar(validou.payload)
                        }
                    };




                    response.status(200).send(resposta);
                }
            });


        } else {
            const resposta = {
                status: false,
                msg: "token invalido",
                codigo: '003',
                dados: {

                }
            }
            response.status(200).send(resposta);
        }
    }



    async AtualizarMovimentacao(request, response) {
        const mov = new Movimentacao();
        mov.idMovimentacao = request.params.idMovimentacao
        mov.data = request.body.data
        mov.hora = request.body.hora
        mov.professor.registro = request.body.professor.registro
        mov.tipo = request.body.tipo
        mov.observacao = request.body.observacao

        await mov.update();
        const resposta = { status: false, msg: 'Movimentacao atualizada com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }


    async ExcluirMovimentacao(request, response) {
        const mov = new Movimentacao();
        mov.idMovimentacao = request.params.idMovimentacao
        console.debug();
        //mov.datamov = request.body.data_mov
        //mov.horamov = request.body.hora_mov
        // mov.funcionariomov.registroprof = request.body.funcionario_mov.registro_prof
        //mov.tipomov = request.body.tipo_mov
        //mov.observacaomov = request.body.observacao_mov

        await mov.delete();
        const resposta = { status: false, msg: 'Movimentacao excluida com sucesso', codigo: 201 }
        response.status(201).send(resposta);
    }
}