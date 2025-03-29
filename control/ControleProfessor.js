const Professor = require("../model/Professor")
const JWT = require("../model/JwtToken")

module.exports = class ControleProfessor {


    async cadastrarProfessor(request, response) {
        const auth = request.headers.authorization;
        console.log("authorization: " + auth);
        const jwt = new JWT();
        const validou = jwt.validar(auth);

        console.log(":>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", validou);
        if (validou.status == true) {
            // Verificações de campos obrigatórios
            const { registro, nome, telefone, tipoUsuario, senha, email } = request.body;
            if (!registro || !nome || !telefone || !tipoUsuario || !senha || !email) {
                return response.status(400).send({
                    status: false,
                    msg: 'Todos os campos são obrigatórios',
                    codigo: 400,
                    dados: {}
                });
            }
            

            const prof = new Professor();
            prof.registro = registro;
            prof.nome = nome;
            prof.telefone = telefone;
            prof.tipoUsuario = tipoUsuario;
            prof.senha = senha;
            prof.email = email;

            try {
                const result = await prof.create();
                const resposta = {
                    status: true,
                    msg: 'Usuário cadastrado com sucesso',
                    codigo: 201,
                    dados: {
                        registro: result.insertIdd,
                        nome: prof.nome,
                        token: jwt.gerar(validou.payload)
                    }
                };
                return response.status(201).send(resposta);
            } catch (temp) {
                if (temp.errno === 1062) {
                    const resposta = {
                        status: false,
                        msg: 'Usuário já cadastrado',
                        codigo: 409,
                        dados: {
                            registro_prof: null,
                            nome_prof: prof.nome,
                            token: jwt.gerar(validou.payload)
                        }
                    };
                    return response.status(409).send(resposta);
                } else {
                    const resposta = {
                        status: false,
                        msg: 'Erro ao cadastrar usuário',
                        codigo: 500,
                        dados: {}
                    };
                    return response.status(500).send(resposta);
                }
            }
        } else {
            const resposta = {
                status: false,
                msg: "Token inválido",
                codigo: '003',
                dados: {}
            };
            return response.status(401).send(resposta);
        }

    }

    async LerProfessor(request, response) {
        const auth = request.headers.authorization;
        console.log(auth);
        const jwt = new JWT;
        const validou = jwt.validar(auth);
        if (validou.status == true) {

            const prof = new Professor();
            prof.registro = request.params.registro

            await prof.read().then(() => {
                const resposta = {
                    status: false,
                    msg: 'Usuário lido com sucesso',
                    codigo: 201,
                    dados: {}
                    
                }
                response.status(201).send(resposta);
            });

            //colocar o catch.erro

        } else {
            const resposta = {
                status: false,
                msg: "token invalido",
                codigo: '003',
                dados: {}
            }
            response.status(200).send(resposta);
        }


    }

    //perguntar do id, se pd ser _registro_prof
    async AtualizarProfessor(request, response) {
        const auth = request.headers.authorization;
        console.log(auth);
        const jwt = new JWT;
        const validou = jwt.validar(auth);
        if (validou.status == true) {

            const prof = new Professor();
            prof.registro = request.params.registro;
            prof.nome = request.body.nome;
            prof.telefone = request.body.telefone;
            prof.tipoUsuario = request.body.tipoUsuario;
            prof.senha = request.body.senha;
            prof.email = request.body.email;
            const result = await prof.update();
            const resposta = { status: false, msg: 'Usuário ATUALIZADO com sucesso', codigo: 201 }
            if (result == false) {
                resposta.status = false;
                resposta.msg = "erro";
                resposta.codigo = 200;
            }

            response.status(201).send(resposta);
        } else {
            const resposta = {
                status: false,
                msg: "token invalido",
                codigo: '003',
                dados: {}
            }
            response.status(200).send(resposta);
        }
    }

    async ExcluirProfessor(request, response) {

        const auth = request.headers.authorization;
        console.log(auth);
        const jwt = new JWT;
        const validou = jwt.validar(auth);
        if (validou.status == true) {
            const prof = new Professor();
            prof.registro = request.params.registro
            //prof.nomeprof = request.body.nome_prof
            //prof.telefoneprof = request.body.telefone_prof;
            //prof.usuarioadmprof = request.body.usuario_adm_prof;
            //prof.senhaprof = request.body.senha_prof;

            await prof.delete();
            const resposta = { status: false, msg: 'Usuário excluido com sucesso', codigo: 201 }
            response.status(201).send(resposta);
        } else {
            const resposta = {
                status: false,
                msg: "token invalido",
                codigo: '003',
                dados: {}
            }
            response.status(200).send(resposta);
        }
    }


    async logar(request, response) {
        console.log("ControleProfessor_login.js");
        const { registro, senha } = request.body;
        
        const professor = new Professor();
        professor.registro = registro;
        professor.senha = senha;
      
        try {
          const result = await professor.login();
          console.log("dados login >>", result);
      
          if (result.status === true) {
            const jwt = new JWT();
            const token = jwt.gerar(result);
      
            const resposta = {
              status: true,
              token: token,
              registro: professor.registro,
              nome: professor.nome
            }
            response.status(200).send(resposta);
          } else {
            response.status(200).send("Erro ao logar o usuário!! usuário ou senha incorretos");
          }
        } catch (error) {
          console.error("Erro ao realizar login:", error);
          response.status(500).send("Erro interno ao realizar login");
        }
      }
}